import { FsFilter } from '@firestitch/filter';

import { Alias, Model} from 'tsmodels';
import { Column } from './column.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Pagination } from './pagination.model';


export class FsListConfig extends Model {
  @Alias() public inlineFilters: any;
  @Alias() public topActions: any;
  @Alias() public columnTemplates: any;
  @Alias('data') public dataFn: any;
  @Alias() public filters = [];

  public filtersQuery: any;
  public columns: Column[] = [];
  public persist: string;
  public paging = new Pagination();
  public filterService = new FsFilter();

  public data$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(config: any = {}) {
    super();

    this._fromJSON(config);


    this.watchFilters();
    this.initPaging(config);
    this.watchPaging();
  }

  public static create(config) {
    return new FsListConfig(config);
  }

  public load() {
    const query = Object.assign({}, this.filtersQuery, this.paging.query);
    const result: any = this.dataFn(query);

    if (result instanceof Promise) {
      result.then(response => {
        this.data$.next(response.data);
        this.paging.updatePaging(response.paging);
      });
    } else if (result instanceof Observable) {
      result.subscribe(response => {
        this.data$.next(response.data);
        this.paging.updatePaging(response.paging);
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
      this.columns.push(col);
    })
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
  private watchPaging() {
    this.paging.pageChanged.subscribe(() => {
      this.load();
    });
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
