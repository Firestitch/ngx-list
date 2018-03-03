//import { Observable } from 'rxjs/Observable';

export interface FsPaging {
  limits?: number[];
  limit?: number;
  page?: number;
  pages?: number;
  records?: number;
}

export interface FsListConfig {
  title?: string;
  status?: boolean;
  filterInput?: boolean;
  paging?: FsPaging;
  columnDefaults?: Object;
  filters?: Object[];
  rowActions?: Object[];
  actions?: Object[];
  fetch?: Function;
  initialFetch?: boolean;
  rowEvents?: Object;
  header?: FsListHeaderConfig;
  cell?: FsListCellConfig;
  footer?: FsListFooterConfig;
}

export interface FsListHeaderConfig {
  className?: string;
  align?: string;
}

export interface FsListCellConfig {
  className?: string;
  align?: string;
}

export interface FsListFooterConfig {
  className?: string;
  align?: string;
}

// export interface FsFetchFunction {
//   <T>(query: any): Observable<T> | Promise<T>
// }
