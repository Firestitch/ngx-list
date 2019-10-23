import { Observable } from 'rxjs';
import {
  FsSelectionDialogActionSelected,
  FsSelectionDialogConfigAction, SelectionRef
} from '@firestitch/selection'
import { IFilterConfigItem, IFilterConfigDateItem } from '@firestitch/filter';

import { ActionType } from '../enums/button-type.enum';
import { ReorderPosition, ReorderStrategy } from '../models/reorder.model';
import { PaginationStrategy } from '../enums/pagination-strategy.enum';


export interface FsPaging {
  limits?: number[];
  limit?: number;
  page?: number;
  pages?: number;
  records?: number;
  strategy?: PaginationStrategy;
}

export interface FsListConfig {
  heading?: string;
  trackBy?: string;
  subheading?: string;
  status?: boolean;
  chips?: boolean;
  column?: FsListColumnConfig;
  filterInput?: boolean;
  queryParam?: boolean;
  paging?: FsPaging | false;
  loadMore?: FsListLoadMoreConfig | boolean;
  columnDefaults?: Object;
  filters?: (IFilterConfigItem | IFilterConfigDateItem)[];
  rowActions?: (FsListRowActionGroup | FsListRowAction)[] ;
  rowClass?: (row: any) => string;
  actions?: FsListAction[];
  fetch?: (query: any) => Observable<any>;
  scrollable?: FsListScrollableConfig | boolean;
  selection?: FsListSelectionConfig;
  initialFetch?: boolean;
  rowEvents?: { [name: string]: (event) => void };
  header?: FsListHeaderConfig;
  cell?: FsListCellConfig;
  footer?: FsListFooterConfig;
  reorder?: FsListReorderConfig;
  sorts?: FsListSortsConfig[];
  group?: FsListGroupConfig;
  sort?: string;
  restore?: FsListRestoreConfig;
  noResults?: FsListNoResultsConfig
}

export interface FsListGroupConfig {
  initialExpand?: boolean;
  groupBy?: (row: any) => any;
  compareBy?: (row: any) => any;
  groupActions?: (FsListRowActionGroup | FsListRowAction)[];
}

export interface FsListLoadMoreConfig {
  label?: string;
}

export interface FsListReorderConfig {
  start?: Function;
  done?: Function;
  position?: ReorderPosition;
  strategy?: ReorderStrategy;
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

export interface FsListSortsConfig {
  name: string;
  value: string;
}

export interface FsListScrollableConfig {
  name: string;
  activationDown?: number;
  loaderDiametr?: number;
  status?: boolean;
}

export interface FsListRestoreConfig {
  query?: any;
  filter?: boolean | string;
  filterLabel?: string;
  menuLabel?: string;
  click?: (row: FsListAbstractRow, event?: any) => void | Observable<any>;
  reload?: boolean;
}


export interface FsListNoResultsConfig {
  message?: string;
}

export interface FsListSelectionConfig {
  actions?: FsSelectionDialogConfigAction[];
  actionSelected?: (action: FsListActionSelected) => Observable<boolean>;
  allSelected?: () => void;
  cancelled?: () => void;
  selectAll?: boolean;
  selectionChanged?: (data: any, selectedAll: boolean, selectionRef: SelectionRef) =>
    FsSelectionDialogConfigAction[] | Observable<FsSelectionDialogConfigAction[] | void> | void;
}

export interface FsListFetchSubscription {
  loadOffset?: boolean;
}

export interface FsListAction {
  primary?: boolean;
  icon?: string;
  label?: string;
  menu?: boolean;
  className?: string;
  click?: (event) => void;
  type?: ActionType;
  customize?: boolean;
  show?: () => boolean;
}

export interface FsListRowActionGroup {
  label?: string;
  rowActions: FsListRowAction[]
}

export interface FsListRowAction {
  label?: string;
  type?: ActionType;
  className?: string;
  icon?: string;
  menu?: boolean;
  click?: (row, event) => void;
  show?: (row) => boolean;
  remove?: { title?: string; template?: string; } | boolean;
  restore?: boolean;
}

export interface FsListAbstractRow {
  [name: string]: any;
}

export interface FsListTrackByFn {
  (row: FsListAbstractRow, index?: number): boolean
}

export interface FsListTrackByTargetRowFn {
  (listRow: FsListAbstractRow, targetRow?: FsListAbstractRow): boolean
}

export interface FsListColumnLoadFn {
  (): Observable<FsListColumn[]>;
}

export interface FsListColumnChangeFn {
  (listColumns: FsListColumn[]): void;
}

export interface FsListColumnConfig {
  load?: FsListColumnLoadFn;
  change?: FsListColumnChangeFn;
}

export interface FsListColumn {
  name: string;
  show: boolean;
}

export interface FsListActionSelected extends FsSelectionDialogActionSelected {
  selected: any[];
}
