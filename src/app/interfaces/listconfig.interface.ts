import { Observable } from 'rxjs';
import { SelectionDialogActionCallbackParams } from '@firestitch/selection'

import { ActionType, PaginationStrategy, ReorderPosition, ReorderStrategy } from '../models';

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
  subheading?: string;
  status?: boolean;
  filterInput?: boolean;
  paging?: FsPaging | false;
  columnDefaults?: Object;
  filters?: Object[];
  rowActions?: FsListRowAction[];
  rowClass?: Function;
  actions?: Object[];
  fetch?: Function;
  scrollable?: FsListScrollableConfig | boolean;
  selection?: FsListSelectionConfig;
  initialFetch?: boolean;
  rowEvents?: Object;
  header?: FsListHeaderConfig;
  cell?: FsListCellConfig;
  footer?: FsListFooterConfig;
  reorder?: FsListReorderConfig;
  sorts?: FsListSortsConfig[];
  sort?: string;
  restore?: FsListRestoreConfig;
  noResults?: FsListNoResultsConfig
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
  filter?: boolean;
  filterLabel?: string;
  menuLabel?: string;
  click?: Function;
  reload?: boolean;
}


export interface FsListNoResultsConfig {
  message?: string;
}

export interface FsListSelectionConfig {
  actions?: any[];
  onAction?: (action: OnActionCallbackParams) => Observable<boolean>;
  onSelectAll?: () => void;
  onCancel?: () => void;
}

export interface FsListFetchSubscription {
  loadOffset?: boolean;
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

export interface FsAbstractRow {
  [name: string]: any;
}

interface OnActionCallbackParams extends SelectionDialogActionCallbackParams {
  selectedRows: any[];
}
