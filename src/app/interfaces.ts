import { Observable } from 'rxjs/Observable';

export interface IPaging {
  limits?: number[];
  limit?: number;
  page?: number;
  pages?: number;
  records?: number;
}

export interface IFsListConfig {
  paging?: IPaging;
  columnDefaults?: Object;
  filters?: Object[];
  dataFn?: FsFetchFunction;
  rowActions?: Object[];
  actions?: Object[];
}

export interface FsFetchFunction {
  <T>(query: any): Observable<T> | Promise<T>
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

export interface CellConfig {
  colspan?: string;
  align?: string;
  styleClass?: string | string[];
}
