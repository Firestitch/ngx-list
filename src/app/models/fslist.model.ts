import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { FsFilter } from '@firestitch/filter';
import { IPaging } from '../interfaces';
import { Alias, Model } from 'tsmodels';
import { Column } from './column.model';

export interface FsListCell {
  value?: string;
  onclick?: any;
  onhover?: any;
  html?: string;
  parts?: FsListPart[];
  icon?: string;
}

export interface FsListPart {
  value?: string;
  onclick?: any;
  onhover?: any;
  html?: string;
  icon?: string;
}

export interface TopActions {
  label: string;
  primary: boolean;
  raised: boolean;

  click(): void;
}

export class FsList extends Model {
  public persist: string;
  @Alias() public inlineFilters = false;
  @Alias('columns', Column) public columns: Column[];
  @Alias() public topActions: TopActions[] = [];
  @Alias() public rowComponent;
  @Alias() public data: any = [];
  @Alias() public filters = [];
  // Modules available for column templates
  public data$: BehaviorSubject<FsListCell[][] | any> = new BehaviorSubject<FsListCell[][] | any>([]);

  public paging: IPaging;
  public filterService = new FsFilter();
  public filtersQuery = {};


  static create(config: any) {
    return new FsList(config);
  }

  constructor(config: any) {
    super();
    this._fromJSON(config);
    // Object.assign(this, config || {});
  }

  /*
  setConfig(config: any) {
      Object.assign(this, config || {});
  }
  */

  load(query) {

    this.filtersQuery = query;

    const result: any = this.data(this.filtersQuery);

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
}
