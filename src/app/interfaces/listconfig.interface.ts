import { FsFile } from '@firestitch/file';
import {
  ChangeFn,
  FsFilterAction,
  FsFilterAutoReload,
  FsFilterPersistance,
  IFilterConfigDateItem,
  IFilterConfigItem,
  IFilterSavedFiltersConfig,
} from '@firestitch/filter';
import {
  FsSelectionActionSelected,
  FsSelectionDialogConfigAction,
  SelectionRef,
} from '@firestitch/selection';

import { Observable } from 'rxjs';

import { ReorderPosition } from '../classes/reorder-controller';
import { ActionType } from '../enums/action-type.enum';
import { PaginationStrategy } from '../enums/pagination-strategy.enum';
import { RowType } from '../enums/row-type.enum';
import { FsListState } from '../enums/state.enum';


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
  rowHoverHighlight?: boolean;
  chips?: boolean;
  column?: FsListColumnConfig;
  autoFocus?: boolean;
  filterInput?: boolean;
  queryParam?: boolean;
  paging?: FsPaging | false;
  loadMore?: FsListLoadMoreConfig | boolean;
  columnDefaults?: any;
  filters?: (IFilterConfigItem | IFilterConfigDateItem)[];
  savedFilters?: IFilterSavedFiltersConfig;
  persist?: FsListPersitance;
  rowActions?: (FsListRowActionGroup | FsListRowAction)[];
  rowActionsHover?: boolean;
  rowClass?: (row: any, options?: FsListRowClassOptions) => string;
  rowHover?: boolean;
  actions?: FsListAction[];
  fetch?: FsListFetchFn;
  afterFetch?: FsListAfterFetchFn;
  beforeFetch?: FsListBeforeFetchFn;
  afterContentInit?: FsListAfterContentInitFn;
  afterInit?: FsListAfterInitFn;
  selection?: FsListSelectionConfig;
  initialFetch?: boolean;
  rowEvents?: { [name: string]: (event) => void };
  header?: FsListHeaderConfig;
  cell?: FsListCellConfig;
  footer?: FsListFooterConfig;
  reorder?: FsListReorderConfig;
  sorts?: FsListSortsConfig[];
  group?: FsListGroupConfig;
  sort?: FsListSortConfig;
  restore?: FsListRestoreConfig;
  noResults?: FsListNoResultsConfig;
  emptyState?: FsListEmptyStateConfig;
  filterInit?: ChangeFn;
  filterChange?: ChangeFn;
  reload?: boolean;
  style?: 'line' | 'card' | 'basic';
  autoReload?: FsFilterAutoReload;
}

export interface FsListGroupConfig {
  enabled?: boolean;
  initialExpand?: boolean;
  groupBy?: (row: any) => any;
  compareBy?: (row: any) => any;
  footer?: (
    row: { [key: string]: any },
    group?: {
      [key: string]: any;
      children: {
        [key: string]: any;
      }[];
    },
  ) => boolean;
  actions?: (FsListRowActionGroup | FsListRowAction)[];
}

export interface FsListLoadMoreConfig {
  enabled?: boolean,
  label?: string;
  buttonColor?: 'primary' | 'accent' | 'warn';
  buttonType?: 'flat' | 'raised' | 'stroked' | 'basic';
}

export interface FsListReorderConfig {
  start?: () => void;
  moved?: FsListReorderMovedCallback;
  done?: FsListReorderDoneCallback;
  moveDrop?: FsListReorderMoveInGroupCallback;
  position?: ReorderPosition;
  disabled?: boolean;
  toggle?: boolean;
  label?: string;
  menu?: boolean;
  multiple?: boolean;
  status?: boolean;
}

export type FsListReorderMovedCallback
  = (rows: FsListReorderData[]) => void;

export type FsListReorderDoneCallback
  = (rows: FsListReorderData[]) => void | Observable<any>;

export interface FsListReorderData {
  type: RowType;
  data: any;
  parent: FsListReorderData;
}

export type FsListReorderMoveInGroupCallback =
  (data: { row1: any; row2: any; group1: any; group2: any }) => boolean;

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
  direction?: 'asc' | 'desc';
}

export interface FsListSortConfig {
  value: string;
  direction?: 'asc' | 'desc';
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
  disabled?: boolean;
  selectAll?: boolean;
  selectionChanged?: (data: any, selectedAll: boolean, selectionRef: SelectionRef) =>
    FsSelectionDialogConfigAction[] | Observable<FsSelectionDialogConfigAction[] | void> | void;
}

export interface FsListFetchSubscription {
  loadOffset?: boolean;
  scrollIntoView?: boolean;
}

export type FsListAction = { customize?: boolean } & FsFilterAction;

export interface FsListRowActionGroup {
  label?: string;
  rowActions: FsListRowAction[];
}

export interface FsListRowAction {
  label?: string | FsListRowActionLabelFn;
  type?: ActionType;
  className?: string;
  icon?: string;
  menu?: boolean;
  click?: (row, event, index) => void;
  link?: FsListRowActionLinkFn;
  file?: FsListRowActionFile;
  show?: (row, index: number) => boolean;
  remove?: { title?: string; template?: string } | boolean;
  restore?: boolean;
}

export type FsListRowActionFileFn = (selection: FsFile | FsFile[], row: FsListAbstractRow, index: number) => void;

export type FsListRowActionLinkFn = (row: FsListAbstractRow) => FsListRowActionLink;

export type FsListRowActionLabelFn = (row: FsListAbstractRow) => string;

export interface FsListRowActionFile {
  select: FsListRowActionFileFn;
  error?: (error: unknown) => void;
  multiple?: boolean;
  accept?: string;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  imageQuality?: number;
}

export interface FsListRowActionLink {
  link: any[] | string;
  queryParams?: Record<string, any>;
  target?: string;
}

export interface FsListAbstractRow {
  [name: string]: any;
}

export type FsListTrackByFn = (row: FsListAbstractRow, index?: number) => boolean;

export type FsListTrackByTargetRowFn = (listRow: FsListAbstractRow, targetRow?: FsListAbstractRow) => boolean;

export type FsListColumnLoadFn = () => Observable<FsListColumn[]>;

export type FsListColumnChangeFn = (listColumns: FsListColumn[]) => void;

export type FsListColumnTitleFn = (name: string, defaultTitle: string) => string;

export type FsListColumnTooltipFn = (name: string, show: boolean, disabled: boolean) => string;

export type FsListColumnDisabledFn = (name: string) => boolean;

export type FsListColumnSelectedFn = (name: string, show: boolean) => boolean;

export interface FsListColumnConfig {
  load?: FsListColumnLoadFn;
  change?: FsListColumnChangeFn;
  title?: FsListColumnTitleFn;
  tooltip?: FsListColumnTooltipFn;
  disabled?: FsListColumnDisabledFn;
  selected?: FsListColumnSelectedFn;
}

export interface FsListColumn {
  name: string;
  show: boolean;
}

export interface FsListActionSelected extends FsSelectionActionSelected {
  selected: any[];
}

export interface FsListEmptyStateConfig {
  validate: FsListStateValidationFn;
}

export interface FsListFetchOptions {
  state: FsListState;
}

export type FsListPersitance = FsFilterPersistance;
export type FsListStateValidationFn = (filters: any, rows: FsListAbstractRow[]) => boolean;
export type FsListFetchFn =
  (query: Record<string, any>, options: FsListFetchOptions) =>
    Observable<{ data: unknown[]; paging?: FsPaging }>;

export type FsListAfterFetchFn =
  (query: Record<string, any>, data: unknown[]) => void;

export type FsListBeforeFetchFn =
  (query) => Observable<Record<string, any>>;

export type FsListAfterContentInitFn =
  (query: Record<string, any>, data: unknown[]) => void;

export interface FsListRowClassOptions {
  index: number;
  groupIndex?: number;
  type?: RowType;
}

export type FsListAfterInitFn = (listComponent: any) => void;
