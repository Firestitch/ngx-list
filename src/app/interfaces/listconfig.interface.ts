//import { Observable } from 'rxjs/Observable';

export interface FsPaging {
  limits?: number[];
  limit?: number;
  page?: number;
  pages?: number;
  records?: number;
}

export interface FsListConfig {
  heading?: string;
  subheading?: string;
  status?: boolean;
  filterInput?: boolean;
  paging?: FsPaging | false;
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
  reorder?: FsListReorderConfig;
}

export interface FsListReorderConfig {
  start?: Function;
  done?: Function;
  label?: string;
  menu?: boolean;
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
