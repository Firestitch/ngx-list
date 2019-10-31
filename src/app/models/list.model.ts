import { ElementRef } from '@angular/core';
import { FilterConfig, ItemType } from '@firestitch/filter';
import { FsScrollInstance, FsScrollService } from '@firestitch/scroll';
import { SelectionDialog } from '@firestitch/selection';

import { Alias, Model } from 'tsmodels';

import { from, Observable, Subject, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { SortingDirection } from './column.model';
import { Pagination } from './pagination.model';
import { Sorting } from './sorting.model';
// Interfaces
import {
  FsListConfig,
  FsListFetchSubscription,
  FsListGroupConfig,
  FsListLoadMoreConfig,
  FsListNoResultsConfig,
  FsListRestoreConfig,
  FsListScrollableConfig,
  FsListSelectionConfig,
  FsListTrackByFn,
  FsPaging,
  PageChange
} from '../interfaces';
import { StyleConfig } from './styleConfig.model';
import { Action } from './action.model';
import { ReorderModel, ReorderStrategy } from './reorder.model';
import { RowAction } from './row-action.model';
import { Selection } from './selection.model';
import { ColumnsController } from '../classes/columns-controller';
import { PageChangeType } from '../enums/page-change-type.enum';
import { ActionsController } from '../classes';
import { DataController } from '../classes/data-controller';
import { Operation } from '../enums/operation.enum';

const SHOW_DELETED_FILTERS_KEY = '$$_show_deleted_$$';


export class List extends Model {
  @Alias() public heading: string;
  @Alias() public trackBy: string;
  @Alias() public subheading: string;
  @Alias() public inlineFilters: any;
  // @Alias('actions', Action) public actions: Action[];
  @Alias('rowActions') public rowActionsRaw: any[];
  public groupActionsRaw: any[];
  @Alias('rowClass') public rowClass;
  @Alias() public rowEvents: any;
  @Alias() public restore: FsListRestoreConfig;
  @Alias() public columnTemplates: any;
  @Alias() public filters = [];
  @Alias() public scrollable: FsListScrollableConfig | false = false;
  @Alias() public noResults: FsListNoResultsConfig;
  public reorder: ReorderModel;
  // @Alias() public initialFetch = true; //TODO fixme
  @Alias('fetch') public fetchFn: any;
  // @Alias('rows') private _rows: any;

  public initialized = false;

  // public operation: Operation;
  public filtersQuery: any;

  public hasRowActions;
  public paging = new Pagination();

  public columns = new ColumnsController();
  public actions = new ActionsController();
  public dataController = new DataController();
  public persist: string;
  public sorting = new Sorting([]);
  public selection: Selection;

  public filterConfig: FilterConfig = null;

  public fetch$ = new Subject<FsListFetchSubscription | void>();
  public fetchComplete$ = new Subject<void>();

  public status = true;
  public chips = false;
  public filterInput = true;
  public queryParam = false;
  public restoreMode = false;

  public loading = false;

  public initialFetch = true;

  public fsScrollInstance: FsScrollInstance;

  public onDestroy$ = new Subject();

  private readonly _headerConfig: StyleConfig;
  private readonly _groupCellConfig: StyleConfig;
  private readonly _cellConfig: StyleConfig;
  private readonly _footerConfig: StyleConfig;

  private _fsScrollSubscription: Subscription;

  constructor(
    private el: ElementRef,
    private config: FsListConfig = {},
    private fsScroll: FsScrollService,
    private selectionDialog: SelectionDialog,
  ) {
    super();
    this._fromJSON(config);

    this.initialize(config);

    this._headerConfig = new StyleConfig(config.header);
    this._groupCellConfig = new StyleConfig(config.cell);
    this._cellConfig = new StyleConfig(config.cell);
    this._footerConfig = new StyleConfig(config.footer);

    this.initialized = true;

    this.subscribe();

    if (this.initialFetch) {
      this.dataController.setOperation(Operation.load);
      this.fetch$.next();
    }

  }

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
      groupCell: this._groupCellConfig,
      cell: this._cellConfig,
      footer: this._footerConfig,
    };

    this.columns.setDefaults(defaultConfigs);
    this.columns.initializeColumns(templates);

    // Set sortBy default column
    this.columns.sortableColumns.forEach((column) => {
      this.sorting.addSortableColumn(column);
    });
    this.sorting.initialSortBy(this.config.sort);

    this.initFilters();
    this.initInfinityScroll();
  }

  public reload() {
    this.loading = true;

    this.dataController.setOperation(Operation.reload);
    this.paging.page = 1;

    if (this.fsScrollInstance) {
      this.dataController.clearRows();
      this.fsScrollInstance.reload();
    } else {
      this.fetch$.next();
    }
  }

  /**
   * Watch page changes
   */
  public subscribe() {
    this.paging.pageChanged
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe((event: PageChange) => {
        this.dataController.setOperation(Operation.pageChange);

        // Remove all rows if limits was changed
        if (event.type === PageChangeType.LimitChanged && this.paging.hasPageStrategy) {
          this.dataController.clearRows();
        }

        if (this.paging.hasOffsetStrategy) {
          this.paging.updatePagination();

          if (this.selection) {
            this.selection.updateVisibleRecordsCount(this.paging.getVisibleRecords());
            this.selection.updateTotalRecordsCount(this.paging.records);
            this.selection.pageChanged(this.scrollable);
          }
        }

        if (!this.scrollable && !this.paging.loadMoreEnabled) {

          const contains = [].slice.call(document.querySelectorAll('.cdk-overlay-container')).some(overlay => {
            return this.el.nativeElement.contains(overlay);
          });

          let el = this.el.nativeElement;

          if (!contains) {
            const rect = this.el.nativeElement.getBoundingClientRect();
            if ((rect.top + window.pageYOffset) < window.innerHeight) {
              el = document.body;
            }
          }

          this.fetchComplete$.asObservable()
          .pipe(
            take(1),
            takeUntil(this.onDestroy$)
          )
          .subscribe(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          });
        }

        this.fetch$.next();
      });

    this.sorting.sortingChanged
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe(() => {
        this.dataController.setOperation(Operation.sort);
        this.paging.page = 1;

        if (this.fsScrollInstance) {
          this.dataController.clearRows();
          this.fsScrollInstance.reload();
        } else {
          this.fetch$.next();
        }
      });

    this.listenRowsRemove();
    this.listenFetch();
  }

  public getData(trackBy: FsListTrackByFn) {
    return this.dataController.visibleRowsData.filter(trackBy);
  }

  public hasData(trackBy: FsListTrackByFn) {
    return this.dataController.visibleRowsData.some(trackBy);
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

    if (this.filterConfig) {
      this.filterConfig = null;
    }

    this.columns.destroy();

    this.onDestroy$.next();
    this.onDestroy$.complete();

    this.dataController.destroy();
  }

  /**
   * Do initialization of table
   * @param config
   */
  private initialize(config: FsListConfig) {
    this.columns.initConfig(config.column);
    this.initDefaultOptions(config);
    this.initReoder(config);
    this.initRestore();
    this.initActions(config.actions);
    this.initPaging(config.paging, config.loadMore);
    this.initSelection(config.selection, this.selectionDialog);
    this.initGroups(config.group);
    this.initializeData();
  }

  /**
   * Just init options by default it it wasn't specified
   * @param config
   */
  private initDefaultOptions(config) {
    // We should prevent initial fetch in cases when it will be fetched in any case
    // As ex. scrollable or filter will do fetch in any cases
    if (
      config.initialFetch === false
      || config.scrollable
      || (this.filters && this.filters.length > 0)
    ) { // TODO fixme after tsmodel version update
      this.initialFetch = false;
    }
    if (config.status === false) {
      this.status = false;
    }
    if (config.chips) {
      this.chips = config.chips;
    }
    if (config.filterInput === false) {
      this.filterInput = false;
    }
    if (config.queryParam) {
      this.queryParam = true;
    }
    if (config.sorts) {
      this.sorting.initFakeColumns(config.sorts);
    }
    if (!config.trackBy) {
      this.trackBy = 'id';
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

        this.actions.addReorderAction(action);
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
        click: (row, event) => { this.restoreClick(this.restore.click, row) }, // TODO fix me, move to special file
        restore: true
      });

      if (!this.rowActionsRaw) {
        this.rowActionsRaw = [];
      }

      this.rowActionsRaw.push(restoreAction);

      if (!this.filters) {
        this.filters = [];
      }

      if (this.restore.filter !== false) {
        this.filters.push({
          name: SHOW_DELETED_FILTERS_KEY,
          type: ItemType.Checkbox,
          label: this.restore.filterLabel || 'Show Deleted'
        });
      }
    }

  }

  /**
   * Init paging
   * @param pagingConfig
   * @param loadMore
   */
  private initPaging(pagingConfig: FsPaging | false, loadMore: FsListLoadMoreConfig | boolean) {
    if (pagingConfig) {
      // this.paging.manual = pagingConfig.manual;
      if (pagingConfig.limits) {
        this.paging.limits = pagingConfig.limits
      }

      if (pagingConfig.limit) {
        this.paging.limit = pagingConfig.limit;
      }

      if (!!loadMore) {
        this.paging.setLoadMore(loadMore);
      }

      this.paging.updatePagingStrategy(pagingConfig.strategy);

    } else if (pagingConfig === false) {
      this.paging.enabled = false;
    }
  }

  /**
   * Split actions by categories
   */
  private initActions(actions) {
    if (actions) {
      this.actions.setActions(actions);
    }

    this.hasRowActions =
      (this.rowActionsRaw && this.rowActionsRaw.length > 0)
      || (this.groupActionsRaw && this.groupActionsRaw.length > 0);
  }

  private initSelection(
    selectionConfig: FsListSelectionConfig,
    selectionDialog: SelectionDialog,
  ) {
    if (selectionConfig) {
      this.selection = new Selection(selectionConfig, this.trackBy, selectionDialog);
      this.selection.setRowsData(this.dataController.visibleRows$);
    }
  }

  private initializeData() {
    this.dataController.setAdditionalConfigs({
      scrollable: !!this.scrollable,
      loadMoreEnabled: this.paging.loadMoreEnabled
    });
  }

  private initGroups(groupConfig: FsListGroupConfig) {
    if (groupConfig) {
      this.dataController.setGroupConfig(groupConfig);
      this.groupActionsRaw = groupConfig.actions;
    }
  }

  /**
   * Subscribe to fetch$ event with debounce
   */
  private listenFetch() {
    this.fetch$
      .pipe(
        takeUntil(this.onDestroy$),
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

          if (this.columns.configured) {
            Object.assign(
              query,
              {
                columns: this.columns.visibleColumnsNames,
              }
            )
          }

          return query;
        }),
        switchMap((query) => {
          return this.fetchRemote(query);
        }),
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

  private listenRowsRemove() {
    this.dataController.rowsRemoved$
      .pipe(
        takeUntil(this.onDestroy$),
      )
      .subscribe((rows: any[]) => {
        if (this.paging.enabled) {

          const removedCount = rows.length;

          if (this.paging.hasPageStrategy) {
            this.noDataPaginationUpdate(removedCount);
          } else {
            // Fetch more if has something for fetch
            if (this.dataController.hasData || this.paging.hasNextPage) {
              this.dataController.setOperation(Operation.loadMore);

              this.paging.removeRows(removedCount);
              this.fetch$.next({ loadOffset: true });
            } else {
              this.noDataPaginationUpdate(removedCount);
            }
          }
        }

        // Remove from selection
        if (this.selection) {
          rows.forEach((row) => {
            this.selection.removeRow(row);
          });
        }
      });
  }

  private initInfinityScroll() {
    if (this.fsScrollInstance) {
      return;
    }

    if (this.scrollable) {
      // Scrollable status by default
      if (this.scrollable.status === void 0) {
        this.scrollable.status = true;
      }


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
              const operation = this.dataController.operation;

              // Initial loading if initialFetch equals false
              if (!this.initialFetch
                && !this.paging.initialized
                && operation !== Operation.reload
              ) {

                this.dataController.setOperation(Operation.load);
                startLoading = true;

              } else if (
                operation === Operation.reload ||
                operation === Operation.filter ||
                operation === Operation.sort
              ) {
                startLoading = true;
              } else if (this.paging.initialized && this.paging.hasNextPage) {
                // Loading if content has been scrolled
                startLoading = true;
                this.dataController.setOperation(Operation.load);
                this.paging.goNext();
              }

              if (startLoading) {
                this.fetch$.next();
                fsScrollInstance.loading();
              }
          });

          this.dataController.remoteRowsChange$
            .pipe(
              takeUntil(this.onDestroy$),
            )
            .subscribe(() => {
              fsScrollInstance.loaded();
          });
        });
    }
  }

  /**
   * Update and watch filter changes
   */
  private initFilters() {
    if (this.filterConfig) {
      return;
    }

    if (this.filters && this.filters.length) {

      // Merge sorting and fake sorting cols
      // Fake sorting cols it's cols which don't represented in table cols, like abstract cols
      const sortValues =
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

      const sortConfig = this.sorting.sortingColumn
        ? { value: this.sorting.sortingColumn.name, direction: this.sorting.sortingColumn.direction}
        : null;

      // Config
      this.filterConfig = {
        persist: this.persist,
        items: this.filters || [],
        inline: this.inlineFilters,
        queryParam: this.queryParam,
        sorts: sortValues,
        sort: sortConfig,
        chips: this.chips,
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

    this.checkRestoreFilter();
  }

  /**
   * Callback when Filter has been changed
   * @param filterQuery
   * @param filterSort
   */
  private filterChange(filterQuery, filterSort) {


    this.filtersQuery = filterQuery;

    this.restoreMode = false;

    // Restore option
    this.checkRestoreFilter();

    if (this.restore && this.restore.reload) {
      this.reload();
    }

    this.dataController.setOperation(Operation.filter);

    // Reset paging for request with correct offset
    this.paging.resetPaging();

    if (this.fsScrollInstance) {
      this.dataController.clearRows();
      this.fsScrollInstance.reload();
    } else {
      this.fetch$.next();
    }
  }

  private checkRestoreFilter() {
    // Restore option
    if (this.restore && this.filtersQuery[SHOW_DELETED_FILTERS_KEY]) {
      delete this.filtersQuery[SHOW_DELETED_FILTERS_KEY];

      Object.assign(this.filtersQuery, this.restore.query);

      this.restoreMode = true;
    }
  }

  // Callback when Filter sort has been changed
  private filterSort(filterQuery, filterSort) {
    if (filterSort) {
      const targetColumn = this.columns.visibleColumns
        .find((column) => column.name === filterSort.value);

      if (targetColumn) {
        this.sorting.sortBy(targetColumn);

        const sortDirection = filterSort.direction === 'asc' ? SortingDirection.asc : SortingDirection.desc;
        this.sorting.sortDirection(sortDirection);
      }
    } else {
      // FIXME need to be refactored...
      this.sorting.sortingColumn = void 0;
      this.reload();
    }
  }

  private completeFetch(response) {

    if (!this.paging.page) {
      this.paging.page = 1;
    }

    if (response.paging) {
      const displayed = (Array.isArray(response.data) && response.data.length) || 0;
      this.paging.updatePaging(
        response.paging,
        displayed,
        this.dataController.operation === Operation.loadMore
      );
    }

    /// must be before selection, because seletion use records
    this.dataController.setRowsFromResponse(response.data);
    ///

    // Update selection params
    if (this.selection) {

      if (this.paging.enabled) {
        this.selection.pageChanged(this.scrollable);
        this.selection.updateVisibleRecordsCount(this.paging.getVisibleRecords());
        this.selection.updateTotalRecordsCount(this.paging.records);
      } else {
        const count = response.paging && response.paging.records
          || Array.isArray(response.data) && response.data.length;

        this.selection.updateVisibleRecordsCount(count);
        this.selection.updateTotalRecordsCount(count);
      }

    }

    this.fetchComplete$.next();
    this.loading = false;
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
    if (!this.dataController.hasData) {
      if (this.paging.page > 1) {
        this.paging.goToPage(this.paging.page - 1 || 1);
      } else {
        this.reload();
      }
    }

    this.paging.records -= deletedCount;
    this.paging.updatePagination();

    if (this.dataController.hasData && this.selection) {
      this.selection.updateVisibleRecordsCount(this.dataController.visibleRowsCount);
      this.selection.updateTotalRecordsCount(this.paging.records);
    }
  }

  /**
   * Temporary solution, will do auto subscribe if was returned Observable.
   *
   * TODO: MOVE THIS PEACE OF CODE TO SPECIAL PLACE
   *
   * @param restoreClickCallback
   * @param row
   */
  private restoreClick(restoreClickCallback, row) {
    const restoreClickResult = restoreClickCallback(row);

    if (restoreClickResult instanceof Observable) {
      restoreClickResult
        .pipe(
          take(1),
          takeUntil(this.onDestroy$),
        )
        .subscribe({
          next: () => this.reload(),
          error: () => {},
        })
    }
  }
}
