import { FsFilter } from '@firestitch/filter';

import { Alias, Model} from 'tsmodels';
import { Column, SortingDirection } from './column.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Pagination } from './pagination.model';
import { Sorting } from './sorting.model';


export class FsListConfig extends Model {
  @Alias() public inlineFilters: any;
  @Alias() public actions: any;
  @Alias() public rowActions: any;
  @Alias() public rowEvents: any;
  @Alias() public columnTemplates: any;
  @Alias('data') public dataFn: any;
  @Alias() public filters = [];

  public filtersQuery: any;
  public columns: Column[] = [];
  public persist: string;
  public paging = new Pagination();
  public sorting = new Sorting(this.columns);
  public filterService = new FsFilter();

  public data$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public loading = false;

  constructor(config: any = {}) {
    super();

    this._fromJSON(config);


    this.watchFilters();
    this.initPaging(config);
    this.subscribe();
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

  /**
   * Transform templates for using
   * @param templates
   */
  public tranformTemplatesToColumns(templates) {
    templates.forEach((column) => {
      const col = new Column(column);
      if (col.sortable) { this.sorting.addSortableColumn(col); } // add column to sortable
      this.columns.push(col);
    });
  }

  /**
   * Init paging
   * @param config
   */
  private initPaging(config) {
    if (config.paging) {
      this.paging.enabled = config.paging.enabled;
      if (config.paging.limits) {
        this.paging.limits = config.paging.limits
      }
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

}
