import { ItemType } from '@firestitch/filter';
import { FsScrollService } from '@firestitch/scroll';
import { FsScrollInstance } from '@firestitch/scroll/classes';
import { SelectionDialog } from '@firestitch/selection';

import * as _isNumber from 'lodash/isNumber';
import { Alias, Model } from 'tsmodels';

import { from, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Column, SortingDirection } from './column.model';
import { Pagination } from './pagination.model';
import { Sorting } from './sorting.model';

import {
  FsListConfig,
  FsListFetchSubscription,
  FsListNoResultsConfig,
  FsListScrollableConfig,
  FsListSelectionConfig,
  FsPaging
} from '../interfaces';
import { StyleConfig } from './styleConfig.model';
import { Action } from './action.model';
import { ReorderModel, ReorderStrategy } from './reorder.model';
import { RowAction } from './row-action.model';
import { Selection } from './selection.model';

const SHOW_DELETED_FILTERS_KEY = '$$_show_deleted_$$';


export class List extends Model {
  @Alias() public heading: string;
  @Alias() public subheading: string;
  @Alias() public inlineFilters: any;
  @Alias('actions', Action) public actions: Action[];
  @Alias('rowActions') public rowActionsRaw: any[];
  @Alias('rowClass') public rowClass;
  @Alias() public rowEvents: any;
  @Alias() public restore: any;
  @Alias() public columnTemplates: any;
  @Alias() public filters = [];
  @Alias() public scrollable: FsListScrollableConfig | false = false;
  @Alias() public noResults: FsListNoResultsConfig;
  public reorder: ReorderModel;
  // @Alias() public initialFetch = true; //TODO fixme
  @Alias('fetch') public fetchFn: any;
  // @Alias('rows') private _rows: any;

  public initialized = false;

  public operation: Operation;
  public filtersQuery: any;

  public hasRowActions;
  public menuActions: Action[] = [];
  public kebabActions: Action[] = [];

  public columns: Column[] = [];
  public persist: string;
  public paging = new Pagination();
  public sorting = new Sorting(this.columns);
  public selection: Selection;

  public filterConfig = null;

  public fetch$ = new Subject<FsListFetchSubscription | void>();
  public data$: Subject<any> = new Subject<any>();
  public data = [];

  public status = true;
  public filterInput = true;
  public restoreMode = false;

  public loading = false;

  public hasHeader = false;
  public hasFooter = false;
  public initialFetch = true;

  public theadClass = '';
  public fsScrollInstance: FsScrollInstance;

  public onDestroy$ = new Subject();

  private readonly _headerConfig: StyleConfig;
  private readonly _cellConfig: StyleConfig;
  private readonly _footerConfig: StyleConfig;

  private _fsScrollSubscription: Subscription;

  constructor(
    private config: FsListConfig = {},
    private fsScroll: FsScrollService,
    private selectionDialog: SelectionDialog,
  ) {
    super();
    this._fromJSON(config);

    this.initialize(config);

    this._headerConfig = new StyleConfig(config.header);
    this._cellConfig = new StyleConfig(config.cell);
    this._footerConfig = new StyleConfig(config.footer);

    this.subscribe();

    this.initialized = true;

    this.data$.subscribe((rows) => {
      if (this.scrollable) {
        switch (this.operation) {
          case Operation.filter:
          case Operation.reload:
          case Operation.sort: {
            this.data = [...rows];
          } break;

          default: {
            this.data.push(...rows);
          }
        }
      } else {
        if (this.operation === Operation.loadMore) {
          this.data.push(...rows);
        } else {
          this.data = [...rows];
        }
      }

      this.operation = Operation.idle;
    });

    if (this.initialFetch) {
      this.operation = Operation.load;
      this.fetch$.next();
    }

  }

  // set rows(value) {
  //   this._rows = value;
  // }

  public fetchRemote(query) {
    const result: any = this.fetchFn(query);

    return result instanceof Promise ? from(result) : result;
  }

  // public loadLocal() {
  //   this.paging.updatePagingManual(this._rows);
  //   const from = (this.paging.page - 1) * this.paging.limit;
  //   const to = (this.paging.page === 1) ? this.paging.limit : this.paging.limit * this.paging.page;
  //   const sliceOfRows = this._rows.slice(from, to);
  //   this.data$.next(sliceOfRows);
  // }

  /**
   * Transform templates for using
   * @param templates
   */
  public tranformTemplatesToColumns(templates) {
    const defaultConfigs = {
      header: this._headerConfig,
      cell: this._cellConfig,
      footer: this._footerConfig,
    };


    templates.forEach((column) => {
      const col = new Column(column, defaultConfigs);

      if (col.sortable) {
        this.sorting.addSortableColumn(col);
      } // add column to sortable
      if (col.headerTemplate || col.title) {
        this.hasHeader = true;
      }
      if (col.footerTemplate) {
        this.hasFooter = true;
      }

      this.columns.push(col);
    });

    this.theadClass = this.hasHeader ? 'has-header' : '';

    this.updateColspans('headerConfigs', 'headerColspanned');
    this.updateColspans('cellConfigs', 'cellColspanned');
    this.updateColspans('footerConfigs', 'footerColspanned');

    // Set sortBy default column
    this.sorting.initialSortBy(this.config.sort);

    this.initFilters();
    this.initInfinityScroll();

  }

  public reload() {
    this.loading = true;

    this.operation = Operation.reload;
    this.paging.page = 1;

    if (this.fsScrollInstance) {
      this.data = [];
      this.fsScrollInstance.reload();
    } else {
      this.fetch$.next();
    }
  }

  /**
   * Watch page changes
   */
  public subscribe() {
    this.paging.pageChanged.subscribe(() => {
      this.operation = Operation.pageChange;

      if (this.selection) {
        this.selection.updateVisibleRecordsCount(this.paging.limit);
        this.selection.updateTotalRecordsCount(this.paging.records);
        this.selection.selectAllVisibleRows(false);
      }

      this.fetch$.next();
    });

    this.sorting.sortingChanged.subscribe(() => {
      this.operation = Operation.sort;
      this.paging.page = 1;

      if (this.fsScrollInstance) {
        this.data = [];
        this.fsScrollInstance.reload();
      } else {
        this.fetch$.next();
      }

    });

    this.listenFetch();
  }

  public deleteRows(rows: any, trackBy?: (targetRow: any, listRow: any) => boolean) {

    let deletedCount = 0;

    if (Array.isArray(rows)) {

      rows.forEach((item) => {
        if (this.deleteRow(item, trackBy)) {
          deletedCount++;
        }
      });
    } else {
      if (this.deleteRow(rows, trackBy)) {
        deletedCount++;
      }
    }

    if (this.paging.enabled && deletedCount > 0) {

      if (this.paging.hasPageStrategy) {
        this.noDataPaginationUpdate(deletedCount);
      } else {
        // Fetch more if has something for fetch
        if (this.data.length || this.paging.hasNextPage) {
          this.operation = Operation.loadMore;

          this.paging.deleteRows(deletedCount);
          this.fetch$.next( { loadOffset: true});
        } else {
          this.noDataPaginationUpdate(deletedCount);
        }
      }
    }
  }

  public destroy() {
    if (this._fsScrollSubscription) {
      this._fsScrollSubscription.unsubscribe();
    }

    if (this.paging) {
      this.paging.destroy();
    }

    if (this.sorting) {
      this.sorting.destroy();
    }

    if (this.selection) {
      this.selection.destroy();
    }

    this.onDestroy$.next();
    this.onDestroy$.complete();

    this.data$.complete();
  }

  /**
   * Do initialization of table
   * @param config
   */
  private initialize(config: FsListConfig) {
    this.initDefaultOptions(config);
    this.initReoder(config);
    this.initRestore();
    this.initActions();
    this.initPaging(config.paging);
    this.initSelection(config.selection, this.selectionDialog);
  }

  /**
   * Just init options by default it it wasn't specified
   * @param config
   */
  private initDefaultOptions(config) {
    if (config.initialFetch === false) { // TODO fixme after tsmodel version update
      this.initialFetch = false;
    }
    if (config.status === false) {
      this.status = false;
    }
    if (config.filterInput === false) {
      this.filterInput = false;
    }
    if (!config.actions) {
      this.actions = [];
    }
    if (config.sorts) {
      this.sorting.initFakeColumns(config.sorts);
    }
  }

  /**
   * Init reorder action button (must be on first place)
   */
  private initReoder(config) {
    if (config.reorder) {
      this.reorder = new ReorderModel(this, config.reorder);

      if (this.reorder.strategy === ReorderStrategy.Manual) {
        const action = new Action({
          label: this.reorder.label || 'Reorder',
          menu: this.reorder.menu,
          click: () => {
            this.reorder.enabled = true;
          }
        });

        this.actions.push(action);
      }
    }
  }

  /**
   * Init restore row action and append Show Deleted option into filters
   */
  private initRestore() {
    if (this.restore) {
      const restoreAction = new RowAction({
        label: this.restore.menuLabel || 'Restore',
        menu: true,
        click: this.restore.click,
        restore: true
      });

      if (!this.rowActionsRaw) {
        this.rowActionsRaw = [];
      }

      this.rowActionsRaw.push(restoreAction);

      if (!this.filters) {
        this.filters = [];
      }

      this.filters.push({
        name: SHOW_DELETED_FILTERS_KEY,
        type: ItemType.checkbox,
        label: this.restore.filterLabel || 'Show Deleted'
      })
    }

  }

  /**
   * Init paging
   * @param pagingConfig
   */
  private initPaging(pagingConfig: FsPaging | false) {
    if (pagingConfig) {
      // this.paging.manual = pagingConfig.manual;
      if (pagingConfig.limits) {
        this.paging.limits = pagingConfig.limits
      }

      this.paging.updatePagingStrategy(pagingConfig.strategy);

    } else if (pagingConfig === false) {
      this.paging.enabled = false;
    }
  }

  /**
   * Split actions by categories
   */
  private initActions() {
    this.menuActions = this.actions.filter((action) => !action.menu);
    this.kebabActions = this.actions.filter((action) => action.menu);
    this.hasRowActions = this.rowActionsRaw && this.rowActionsRaw.length > 0;
  }

  private initSelection(
    selectionConfig: FsListSelectionConfig,
    selectionDialog: SelectionDialog,
  ) {
    if (selectionConfig) {
      this.selection = new Selection(selectionConfig, selectionDialog);
    }
  }

  /**
   * Subscribe to fetch$ event with debounce
   */
  private listenFetch() {
    this.fetch$
      .pipe(
        debounceTime(50),
        tap(() => {
          this.loading = true;
        }),
        map((params: FsListFetchSubscription) => {
          const query = this.paging.hasOffsetStrategy && params && params.loadOffset
            ? Object.assign({}, this.filtersQuery, this.paging.loadDeletedOffsetQuery)
            : Object.assign({}, this.filtersQuery, this.paging.query);

          if (this.sorting.sortingColumn) {
            Object.assign(
              query,
              {
                order: `${this.sorting.sortingColumn.name},${this.sorting.sortingColumn.direction}`
              }
            )
          }

          return query;
        }),
        switchMap((query) => {
          return this.fetchRemote(query);
        }),
        takeUntil(this.onDestroy$),
        catchError((error, source$) => {
          return source$;
        })
      )
      .subscribe((response) => {
        this.completeFetch(response);
        // if (this.fetchFn) {
        //
        // } else {
        //   console.warn('No fetch function supplied');
        // }
      });
  }

  private initInfinityScroll() {
    if (this.scrollable) {
      this.fsScroll
        .component(this.scrollable.name)
        .pipe(
          takeUntil(this.onDestroy$)
        )
        .subscribe((fsScrollInstance: FsScrollInstance) => {
          this.fsScrollInstance = fsScrollInstance;
          this._fsScrollSubscription = fsScrollInstance
            .subscribe(() => {
              let startLoading = false;

              // Initial loading if initialFetch equals false
              if (!this.initialFetch
                && !this.paging.initialized
                && this.operation !== Operation.reload) {

                this.operation = Operation.load;
                startLoading = true;

              } else if (
                this.operation === Operation.reload ||
                this.operation === Operation.filter ||
                this.operation === Operation.sort
              ) {
                startLoading = true;
              } else if (this.paging.initialized && this.paging.hasNextPage) {
                // Loading if content has been scrolled
                startLoading = true;
                this.operation = Operation.load;
                this.paging.goNext();
              }

              if (startLoading) {
                this.fetch$.next();
                fsScrollInstance.loading();
              }
          });

          this.data$.subscribe(() => {
            fsScrollInstance.loaded();
          });
        });
    }
  }

  /**
   * Update and watch filter changes
   */
  private initFilters() {
    if (this.filters && this.filters.length) {

      // Merge sorting and fake sorting cols
      // Fake sorting cols it's cols which don't represented in table cols, like abstract cols
      const sortingValues =
        [
          ...this.sorting.sortingColumns,
          ...this.sorting.fakeSortingColumns
        ].reduce((acc, column) => {

          const sortingItem = {
            name: column.title,
            value: column.name,
            default: this.sorting.sortingColumn && this.sorting.sortingColumn.name === column.name
          };

          acc.push(sortingItem);
          return acc;
        }, []);

      // Config
      this.filterConfig = {
        persist: this.persist,
        items: this.filters || [],
        inline: this.inlineFilters,
        sorting: sortingValues,
        sortingDirection: (this.sorting.sortingColumn && this.sorting.sortingColumn.direction) || 'asc',
        init: this.filterInit.bind(this),
        change: this.filterChange.bind(this),
        reload: this.reload.bind(this),
        sortChange: this.filterSort.bind(this),
      };
    } else {
      this.filtersQuery = {};
    }
  }

  /**
   * Callback when Filter has been initialized
   * @param filters
   */
  private filterInit(filters) {
    this.filtersQuery = filters;
  }

  /**
   * Callback when Filter has been changed
   * @param query
   * @param instance
   */
  private filterChange(query, instance) {

    this.filtersQuery = instance.gets({ flatten: true });

    this.restoreMode = false;

    // Restore option
    if (this.restore && this.filtersQuery[SHOW_DELETED_FILTERS_KEY]) {
      delete this.filtersQuery[SHOW_DELETED_FILTERS_KEY];

      Object.assign(this.filtersQuery, this.restore.query);

      this.restoreMode = true;

      if (this.restore.reload) {
        this.paging.page = 1;
      }
    }

    this.operation = Operation.filter;

    if (this.fsScrollInstance) {
      this.data = [];
      this.paging.page = 1;
      this.fsScrollInstance.reload();
    } else {
      this.fetch$.next();
    }
  }

  // Callback when Filter sort has been changed
  private filterSort(instance) {

    const sorting = instance.getSorting();
    const targetColumn = this.columns.find((column) => column.name === sorting.sortBy);

    if (targetColumn) {
      this.sorting.sortBy(targetColumn);

      const sortDirection = sorting.sortDirection === 'asc' ? SortingDirection.asc : SortingDirection.desc;
      this.sorting.setSortDirection(sortDirection);
    }
  }

  private updateColspans(config, updateFlag) {
    this.columns.forEach((col, index) => {

      if (col[config].colspan !== void 0) {
        const spanTo = index + +col[config].colspan;

        if (!_isNumber(spanTo)) {
          return;
        }
        this.columns[index][updateFlag] = false;

        for (let i = index + 1; i < spanTo; i++) {
          if (this.columns[i]) {
            this.columns[i][updateFlag] = true;
          }
        }
      }
    })
  }

  private completeFetch(response) {
    if (!this.paging.page) {
      this.paging.page = 1;
    }

    if (response.paging) {
      this.paging.updatePaging(
        response.paging,
        this.operation === Operation.loadMore
      );
    }

    // Update selection params
    if (this.selection) {

      if (this.paging.enabled) {
        this.selection.updateVisibleRecordsCount(this.paging.limit);
        this.selection.updateTotalRecordsCount(this.paging.records);
      } else {
        const count = response.paging && response.paging.records
          || Array.isArray(response.data) && response.data.length;

        this.selection.updateVisibleRecordsCount(count);
        this.selection.updateTotalRecordsCount(count);
      }

    }

    this.loading = false;
    this.data$.next(response.data);
  }

  /**
   * Remove row from
   * @param targetRow
   * @param trackBy
   */
  private deleteRow(targetRow: any, trackBy?: (targetRow: any, listRow: any) => boolean) {
    if (trackBy === void 0) {
      trackBy = (row, target) => {
        return row === target;
      }
    }

    const targetIndex = this.data.findIndex((listRow) => trackBy(targetRow, listRow));

    if (targetIndex !== -1) {
      this.data.splice(targetIndex, 1);

      return true;
    }

    return false;
  }

  /**
   * Will do some actions if you removed item and item was last on his own page
   *
   * Ex: if list has 3 pages and on third page you have only one item. And you just deleted this item.
   * You must go to second page, but if it was last page and you can't go back -> just reload
   *
   * @param deletedCount
   */
  private noDataPaginationUpdate(deletedCount) {
    if (this.data.length === 0) {
      if (this.paging.page > 1) {
        this.paging.goToPage(this.paging.page - 1 || 1);
      } else {
        this.reload();
      }
    }

    this.paging.records -= deletedCount;
    this.paging.updatePagination();
  }
}

export enum Operation {
  idle,
  load,
  reload,
  filter,
  sort,
  pageChange,
  loadMore,
}
