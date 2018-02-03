import { FsFilter } from '@firestitch/filter';

import { Column } from './column.model';
import { Pagination } from './pagination.model';
import { Sorting } from './sorting.model';

import * as _isNumber from 'lodash/isNumber';
import { Alias, Model} from 'tsmodels';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';


export class FsListConfig extends Model {
  @Alias() public inlineFilters: any;
  @Alias() public actions: any;
  @Alias() public rowActions: any;
  @Alias() public rowEvents: any;
  @Alias() public columnTemplates: any;
  @Alias('data') public dataFn: any;
  @Alias() public filters = [];
  @Alias('columnDefaults') private _columnDefaults;
  @Alias('rows') private _rows: any;

  public filtersQuery: any;
  public columns: Column[] = [];
  public persist: string;
  public paging = new Pagination();
  public sorting = new Sorting(this.columns);
  public filterService = new FsFilter();

  public data$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  public loading = false;
  public hasFooter = false;

  constructor(config: any = {}) {
    super();

    this._fromJSON(config);


    this.watchFilters();
    this.initPaging(config);
    this.subscribe();
  }

  set rows(value) {
    this._rows = value;
  }

  public static create(config) {
    return new FsListConfig(config);
  }

  public load() {
    this.loading = true;

    const query = Object.assign({}, this.filtersQuery, this.paging.query);

    if (this.sorting.sortingColumn) {
      Object.assign(query, { order: `${this.sorting.sortingColumn.name},${this.sorting.sortingColumn.direction}`})
    }

    if (this.dataFn) {
      this.loadRemote(query);
    } else if (Array.isArray(this._rows)) {
      this.loadLocal();
    }
  }

  public loadRemote(query) {
    const result: any = this.dataFn(query);

    if (result instanceof Promise) {
      result.then(response => {
        this.paging.updatePaging(response.paging);
        this.loading = false;
        this.data$.next(response.data);
      });
    } else if (result instanceof Observable) {
      result.subscribe(response => {
        this.paging.updatePaging(response.paging);
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
    templates.forEach((column) => {
      const col = new Column(column, this._columnDefaults);

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
      this.paging.enabled = config.paging.enabled;
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
          this.load();
        },
        change: (query, instance) => {
          this.filtersQuery = instance.gets({ flatten: true });
          this.load();
        }
      };
    }else {
      this.filtersQuery = {};
      this.load();
    }
  }

  private updateColspans(config, updateFlag) {
    this.columns.forEach((col, index) => {
      if (col[config].colspan !== void 0) {
        const spanTo = index + +col[config].colspan - 1;

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
