//import { Observable } from 'rxjs/Observable';

export interface FsPaging {
  limits?: number[];
  limit?: number;
  page?: number;
  pages?: number;
  records?: number;
}

export interface FsListConfig {
  paging?: FsPaging;
  columnDefaults?: Object;
  filters?: Object[];
  rowActions?: Object[];
  actions?: Object[];
  fetch?: Function;
  rowEvents?: Object;
}

// export interface FsFetchFunction {
//   <T>(query: any): Observable<T> | Promise<T>
// }
