import { FsFilter } from '@firestitch/filter';

import { Column } from './column.model';
import { Pagination } from './pagination.model';
import { Sorting } from './sorting.model';

import * as _isNumber from 'lodash/isNumber';
import { Alias, Model} from 'tsmodels';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FsListConfig } from '../interfaces';
import { StyleConfig } from './styleConfig.model';
import { Action } from './action.model';
import { ReorderModel } from './reorder.model';
import { RowAction } from './row-action.model';


export class FsListModel extends Model {
  @Alias() public heading: string;
  @Alias() public inlineFilters: any;
  @Alias('actions', Action) public actions: Action[];
  @Alias('rowActions', RowAction) public rowActions: RowAction[];
  @Alias() public rowEvents: any;
  @Alias() public columnTemplates: any;
  @Alias() public filters = [];
  @Alias('reorder', ReorderModel) public reoder;
  // @Alias() public initialFetch = true; //TODO fixme
  @Alias('fetch') public fetchFn: any;
  @Alias('rows') private _rows: any;

  public filtersQuery: any;
  public hasRowActions;
  public menuActions: Action[] = [];
  public kebabActions: Action[] = [];
  public columns: Column[] = [];
  public persist: string;
  public paging = new Pagination();
  public sorting = new Sorting(this.columns);
  public filterService = new FsFilter();

  public data$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  public status = true;
  public filterInput = true;
  public reoderEnabled = false;

  public loading = false;
  public hasFooter = false;
  public initialFetch = true;

  private _headerConfig: StyleConfig;
  private _cellConfig: StyleConfig;
  private _footerConfig: StyleConfig;

  constructor(config: FsListConfig = {}) {
    super();
    this._fromJSON(config);

    if (config.initialFetch === false) { //TODO fixme after tsmodel version update
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

    this._headerConfig = new StyleConfig(config.header);
    this._cellConfig = new StyleConfig(config.cell);
    this._footerConfig = new StyleConfig(config.footer);

    if (this.reoder) {
      const action = new Action({
        label: this.reoder.label || 'Reorder',
        menu: this.reoder.menu,
        click: () => {
          this.reoderEnabled = true
        }
      });

      this.actions.push(action);
    }

    this.menuActions = this.actions.filter((action) => !action.menu);
    this.kebabActions = this.actions.filter((action) => action.menu);

    this.hasRowActions = this.rowActions && this.rowActions.length > 0;
    this.watchFilters();
    this.initPaging(config);
    this.subscribe();
  }

  set rows(value) {
    this._rows = value;
  }

  public static create(config) {
    return new FsListModel(config);
  }

  public load() {
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
  }

  public loadRemote(query) {
    const result: any = this.fetchFn(query);

    if (result instanceof Promise) {
      result.then(response => {
        if (response.paging) {
          this.paging.updatePaging(response.paging);
        }

        this.loading = false;
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
    this.loading = false;
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
      if (col.footerTemplate) { this.hasFooter = true; }

      this.columns.push(col);
    });

    this.updateColspans('headerConfigs', 'headerColspanned');
    this.updateColspans('cellConfigs', 'cellColspanned');
    this.updateColspans('footerConfigs', 'footerColspanned');
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
      this.load();
    });

    this.sorting.sortingChanged.subscribe(() => {
      this.load();
    })
  }

  /**
   * Update and watch filter changes
   */
  private watchFilters() {
    if (this.filters && this.filters.length) {
      this.filterService.fsConfig = {
        persist: this.persist,
        items: this.filters,
        inline: this.inlineFilters,
        init: (instance) => {
          this.filtersQuery = instance.gets({ flatten: true });
          if (this.initialFetch) {
            this.load();
          }
        },
        change: (query, instance) => {
          this.filtersQuery = instance.gets({ flatten: true });
          this.load();
        }
      };
    }else {
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
