import { FsFilter } from '@firestitch/filter';

import { Alias, Model} from 'tsmodels';
import { Column } from './column.model';
import { IPaging } from '../interfaces';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


export class FsListConfig extends Model {
  @Alias() public inlineFilters: any;
  @Alias() public topActions: any;
  @Alias() public filters: any;
  @Alias() public columnTemplates: any;
  @Alias('data') public dataFn: any;
  @Alias('filters') public filtersQuery = {};

  public columns = [];

  public persist: string;
  public paging: IPaging;
  public filterService = new FsFilter();

  public data$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(config = {}) {
    super();

    this._fromJSON(config);
    this.watchFilters();
  }

  public static create(config) {
    return new FsListConfig(config);
  }

  public load(query = {}) {

    this.filtersQuery = query;
    const result: any = this.dataFn(this.filtersQuery);

    if (result instanceof Promise) {
      result.then(response => {
        this.data$.next(response.data);
        this.paging = response.paging;
      });
    } else if (result instanceof Observable) {
      result.subscribe(response => {
        this.data$.next(response.data);
        this.paging = response.paging;
      });
    }
  }

  public watchFilters() {
    if (this.filters && this.filters.length) {
      this.filterService.fsConfig = {
        persist: this.persist,
        items: this.filters,
        inline: this.inlineFilters,
        init: (instance) => {
          this.load(instance.gets({ flatten: true }));
        },
        change: (query, instance) => {
          this.load(instance.gets({ flatten: true }));
        }
      };
    }else {
      this.load({});
    }
  }

  public tranformTemplatesToColumns(templates) {
    templates.forEach((column) => {
      const col = new Column(column);
      this.columns.push(col);
    })
  }
}
