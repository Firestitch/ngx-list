import { ItemType } from '@firestitch/filter';
import { FsScrollService } from '@firestitch/scroll';
import { FsScrollInstance } from '@firestitch/scroll/classes';
import * as _isNumber from 'lodash/isNumber';
import { Alias, Model } from 'tsmodels';

import { Subscription } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { never } from 'rxjs/observable/never';
import { catchError, debounceTime, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Column, SortingDirection } from './column.model';
import { Pagination } from './pagination.model';
import { Sorting } from './sorting.model';

import { FsListConfig, FsListScrollableConfig } from '../interfaces';
import { StyleConfig } from './styleConfig.model';
import { Action } from './action.model';
import { ReorderModel } from './reorder.model';
import { RowAction } from './row-action.model';

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
  @Alias('reorder', ReorderModel) public reoder;
  // @Alias() public initialFetch = true; //TODO fixme
  @Alias('fetch') public fetchFn: any;
  // @Alias('rows') private _rows: any;

  public operation: Operation;
  public filtersQuery: any;

  public hasRowActions;
  public menuActions: Action[] = [];
  public kebabActions: Action[] = [];

  public columns: Column[] = [];
  public persist: string;
  public paging = new Pagination();
  public sorting = new Sorting(this.columns);

  public filterConfig = null;

  public fetch$ = new Subject();
  public data$: Subject<any> = new Subject<any>();
  public data = [];

  public status = true;
  public filterInput = true;
  public reoderEnabled = false;
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

  constructor(private config: FsListConfig = {}, private fsScroll: FsScrollService) {
    super();
    this._fromJSON(config);

    this.initDefaultOptions(config);

    this._headerConfig = new StyleConfig(config.header);
    this._cellConfig = new StyleConfig(config.cell);
    this._footerConfig = new StyleConfig(config.footer);

    this.initReoder();
    this.initRestore();

    this.menuActions = this.actions.filter((action) => !action.menu);
    this.kebabActions = this.actions.filter((action) => action.menu);
    this.hasRowActions = this.rowActionsRaw && this.rowActionsRaw.length > 0;

    this.initPaging(config);
    this.subscribe();

    this.data$.subscribe((rows) => {
      if (this.scrollable) {
        switch (this.operation) {
          case Operation.filter:
          case Operation.reload:
          case Operation.sort: {
            this.data = rows;
          } break;

          default: {
            this.data.push(...rows);
          }
        }
      } else {
        this.data = rows;
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

    return result instanceof Promise ? fromPromise(result) : result;
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
      if (col.headerTemplate) {
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

  /************************************************************************/
  /**************************** INITIALIZING ******************************/

  /************************************************************************/

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
  private initReoder() {
    if (this.reoder) {
      const action = new Action({
        label: this.reoder.label || 'Reorder',
        menu: this.reoder.menu,
        click: () => {
          this.reoderEnabled = true;
          // Fire callback that reorder was started
          if (this.reoder.start) {
            this.reoder.start();
          }
        }
      });

      this.actions.push(action);
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
   * @param config
   */
  private initPaging(config) {
    if (config.paging) {
      this.paging.manual = config.paging.manual;
      if (config.paging.limits) {
        this.paging.limits = config.paging.limits
      }
    } else if (config.paging === false) {
      this.paging.enabled = false;
    }
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

  public destroy() {
    if (this._fsScrollSubscription) {
      this._fsScrollSubscription.unsubscribe();
    }

    this.onDestroy$.next();
    this.onDestroy$.complete();

    this.data$.complete();
    this.paging.pageChanged.complete();
    this.sorting.sortingChanged.complete();
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
        map(() => {
          const query = Object.assign({}, this.filtersQuery, this.paging.query);

          if (this.sorting.sortingColumn) {
            Object.assign(query, { order: `${this.sorting.sortingColumn.name},${this.sorting.sortingColumn.direction}` })
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
   * @param instance
   */
  private filterInit(instance) {
    this.filtersQuery = instance.gets({ flatten: true });
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
      this.sorting.sortBy(targetColumn, false);

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
      this.paging.updatePaging(response.paging);
    }

    this.loading = false;
    this.data$.next(response.data);
  }

}

export enum Operation {
  idle,
  load,
  reload,
  filter,
  sort,
  pageChange,
}
