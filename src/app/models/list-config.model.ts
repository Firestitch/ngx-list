// import { FsFilter } from '@firestitch/filter';
import { ItemType } from '@firestitch/filter';

import * as _isNumber from 'lodash/isNumber';
import { Alias, Model} from 'tsmodels';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';

import { Column, SortingDirection } from './column.model';
import { Pagination } from './pagination.model';
import { Sorting } from './sorting.model';

import { FsListConfig, FsListScrollableConfig } from '../interfaces';
import { StyleConfig } from './styleConfig.model';
import { Action } from './action.model';
import { ReorderModel } from './reorder.model';
import { RowAction } from './row-action.model';

const SHOW_DELETED_FILTERS_KEY = '$$_show_deleted_$$';

export class FsListModel extends Model {
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
  @Alias('rows') private _rows: any;
  @Alias() public noResults;
  public filtersQuery: any;
  public hasRowActions;
  public menuActions: Action[] = [];
  public kebabActions: Action[] = [];
  public restoreAction: Action;
  public columns: Column[] = [];
  public persist: string;
  public paging = new Pagination();
  public sorting = new Sorting(this.columns);
  // public filterService = new FsFilter();
  public filterConfig = null;

  public load$ = new Subject();
  public data$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  public status = true;
  public filterInput = true;
  public reoderEnabled = false;
  public restoreMode = false;

  public loading = false;

  public hasHeader = false;
  public hasFooter = false;
  public initialFetch = true;

  public theadClass = '';

  private _headerConfig: StyleConfig;
  private _cellConfig: StyleConfig;
  private _footerConfig: StyleConfig;

  constructor(private config: FsListConfig = {}) {
    super();
    this._fromJSON(config);

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

    this._headerConfig = new StyleConfig(config.header);
    this._cellConfig = new StyleConfig(config.cell);
    this._footerConfig = new StyleConfig(config.footer);

    if (this.reoder) {
      const action = new Action({
        label: this.reoder.label || 'Reorder',
        menu: this.reoder.menu,
        click: () => {
          this.reoderEnabled = true;
          // Fire callback that reorder was started
          if (this.reoder.start) { this.reoder.start(); }
        }
      });

      this.actions.push(action);
    }

    this.menuActions = this.actions.filter((action) => !action.menu);
    this.kebabActions = this.actions.filter((action) => action.menu);

    // Restore
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

      this.filters.push({
        name: SHOW_DELETED_FILTERS_KEY,
        type: ItemType.checkbox,
        label: this.restore.filterLabel || 'Show Deleted'
      })
    }

    this.hasRowActions = this.rowActionsRaw && this.rowActionsRaw.length > 0;
    this.initPaging(config);
    this.subscribe();
  }

  set rows(value) {
    this._rows = value;
  }

  public static create(config) {
    return new FsListModel(config);
  }

  public loadRemote(query) {
    const result: any = this.fetchFn(query);

    if (result instanceof Promise) {
      result.then(response => {
        if (response.paging) {
          this.paging.updatePaging(response.paging);
        }

        // this.loading = false;
        this.data$.next(response.data);
      });
    } else if (result instanceof Observable) {
      result.subscribe(response => {
        if (response.paging) {
          this.paging.updatePaging(response.paging);
        }

        this.loading = false;
        this.data$.next(response.data);
      });
    }
  }

  public loadLocal() {
    this.paging.updatePagingManual(this._rows);
    const from = (this.paging.page - 1) * this.paging.limit;
    const to = (this.paging.page === 1) ? this.paging.limit : this.paging.limit * this.paging.page;
    const sliceOfRows = this._rows.slice(from, to);
    this.data$.next(sliceOfRows);
    // this.loading = false;
  }

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

      if (col.sortable) { this.sorting.addSortableColumn(col); } // add column to sortable
      if (col.headerTemplate) { this.hasHeader = true; }
      if (col.footerTemplate) { this.hasFooter = true; }

      this.columns.push(col);
    });

    this.theadClass = this.hasHeader ? 'has-header' : '';

    this.updateColspans('headerConfigs', 'headerColspanned');
    this.updateColspans('cellConfigs', 'cellColspanned');
    this.updateColspans('footerConfigs', 'footerColspanned');

    // Set sortBy default column
    this.sorting.initialSortBy(this.config.sort);

    this.watchFilters();
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

  /**
   * Watch page changes
   */
  private subscribe() {
    this.paging.pageChanged.subscribe(() => {
      this.load$.next();
    });

    this.sorting.sortingChanged.subscribe(() => {
      this.load$.next();
    });

    this.subscribeToOnLoad();
  }

  /**
   * Subscribe to load$ event with debounce
   */
  private subscribeToOnLoad() {
    this.load$
      .pipe(debounceTime(50))
      .subscribe(() => {
        this.loading = true;

        const query = Object.assign({}, this.filtersQuery, this.paging.query);

        if (this.sorting.sortingColumn) {
          Object.assign(query, { order: `${this.sorting.sortingColumn.name},${this.sorting.sortingColumn.direction}`})
        }

        if (this.fetchFn) {
          this.loadRemote(query);
        } else if (Array.isArray(this._rows)) {
          this.loadLocal();
        }
      });
  }

  /**
   * Update and watch filter changes
   */
  private watchFilters() {
    if (this.filters && this.filters.length) {

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

      this.filterConfig = {
        persist: this.persist,
        items: this.filters || [],
        inline: this.inlineFilters,
        sorting: sortingValues,
        sortingDirection: (this.sorting.sortingColumn && this.sorting.sortingColumn.direction) || 'asc',
        init: (instance) => {
          this.filtersQuery = instance.gets({ flatten: true });
          if (this.initialFetch) {
            this.load$.next();
          }
        },
        change: (query, instance) => {
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

          this.load$.next();
        },
        sortChange: (instance) => {
          const sorting = instance.getSorting();
          const targetColumn = this.columns.find((column) => column.name === sorting.sortBy);
          if (targetColumn) {
            this.sorting.sortBy(targetColumn, false);

            const sortDirection = sorting.sortDirection === 'asc' ? SortingDirection.asc : SortingDirection.desc;
            this.sorting.setSortDirection(sortDirection);
          }
        }
      };
    } else {
      this.filtersQuery = {};
    }
  }

  private updateColspans(config, updateFlag) {
    this.columns.forEach((col, index) => {

      if (col[config].colspan !== void 0) {
        const spanTo = index + +col[config].colspan;

        if (!_isNumber(spanTo)) { return; }
        this.columns[index][updateFlag] = false;

        for (let i = index + 1; i < spanTo; i++) {
          if (this.columns[i]) {
            this.columns[i][updateFlag] = true;
          }
        }
      }
    })
  }

}
