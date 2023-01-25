import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isFunction, isObject } from 'lodash-es';

import { FsListState } from '../enums/state.enum';
import { RowType } from '../enums/row-type.enum';
import {
  FsListAbstractRow,
  FsListGroupConfig,
  FsListTrackByTargetRowFn
} from '../interfaces/listconfig.interface';
import { GroupRow } from '../models/row/group-row';
import { ChildRow } from '../models/row/child-row';
import { Row } from '../models/row';
import { GroupFooterRow } from '../models/row/group-footer-row';


export class DataController {

  private readonly _visibleRows$ = new BehaviorSubject<Row[]>([]);
  private readonly _rowsRemoved$ = new Subject<Row[]>();
  private readonly _remoteRowsChange$ = new Subject<void>();

  private _store = new Map();
  private _rowsStack: Row[] = [];
  private _operation: FsListState;

  private _groupByFn: (row) => any[];
  private _footerRowFn: (row, group) => boolean;
  private _compareByFn: (group) => any;
  private _initialExpand = true;
  private _groupEnabled = false;

  private _infinityScrollEnabled: boolean;
  private _loadMoreEnabled: boolean;

  private _hasData = false;

  private readonly _destroy$ = new Subject<void>();

  constructor() {}

  get visibleRows$() {
    return this._visibleRows$;
  }

  get visibleRows() {
    return this._visibleRows$.getValue();
  }

  get visibleRowsData() {
    return this.visibleRows.map((row) => row.data);
  }

  get rowsStack() {
    return this._rowsStack.slice();
  }

  get groupEnabled() {
    return this._groupEnabled;
  }

  set groupEnabled(value: boolean) {
    this._groupEnabled = value;
  }

  get remoteRowsChange$() {
    return this._remoteRowsChange$.pipe(
      takeUntil(this._destroy$),
    );
  }

  get rowsRemoved$() {
    return this._rowsRemoved$.pipe(
      takeUntil(this._destroy$),
    );
  }

  get hasData() {
    return this._hasData;
  }

  get operation() {
    return this._operation;
  }

  set visibleRows(value: any[]) {
    this._visibleRows$.next(value);
    this._hasData = this.visibleRows.length > 0;
  }

  get visibleRowsCount() {
    return this.visibleRows.length;
  }

  get hasGroups() {
    return this._compareByFn && this._groupByFn;
  }

  get reorderData() {
    return this._rowsStack
      .map((row) => row.getReorderData());
  }

  public setGroupConfig(group: FsListGroupConfig) {
    if (group) {
      this._groupByFn = group.groupBy;
      this._compareByFn = group.compareBy;
      this._footerRowFn = group.footer || (() => false);
      this._initialExpand = group.initialExpand ?? true;

      // group mode enabled by default
      this._groupEnabled = (group.enabled !== void 0)
        ? group.enabled
        : true;
    }
  }

  public setAdditionalConfigs(configs: { scrollable: boolean, loadMoreEnabled: boolean }) {
    this._infinityScrollEnabled = configs.scrollable;
    this._loadMoreEnabled = configs.loadMoreEnabled;
  }

  /**
   * Rows what was received from fetch function
   * @param rows
   */
  public setRowsFromResponse(rows: any[]) {
    if (this._infinityScrollEnabled) {
      switch (this._operation) {
        case FsListState.Filter:
        case FsListState.Reload:
        case FsListState.Sort: {
          this._updateRowsStack(rows);
        } break;

        default: {
          this._extendRowsStack(rows);
        }
      }

      this._remoteRowsChange$.next();
    } else {
      if (
        this._operation === FsListState.LoadMore ||
        (this._operation === FsListState.PageChange && this._loadMoreEnabled)
      ) {
        this._extendRowsStack(rows);
      } else {
        this._updateRowsStack(rows);
      }
    }

    this._operation = FsListState.Idle;

    this._updateVisibleRows();
  }

  /**
   * Set current operation for list data flow
   * @param value
   */
  public setOperation(value: FsListState) {
    this._operation = value;
  }

  /**
   * Remove rows from visible
   */
  public clearRows() {
    this.visibleRows = [];
  }

  /**
   * Replace data for specified row
   * @param targetRow
   * @param trackBy
   */
  public replaceData(
    targetRow: FsListAbstractRow,
    trackBy?: FsListTrackByTargetRowFn
  ) {
    const rowIndex = this._rowsStack.findIndex((listRow) => {
      return trackBy(listRow.data, targetRow);
    });

    if (rowIndex > -1) {
      this._rowsStack[rowIndex] = new Row(
        targetRow,
        RowType.Simple,
        { initialExpand: this._initialExpand }
      );

      this._updateVisibleRows();

      return true;
    } else {
      return false;
    }

  }

  /**
   * Update data for specified row
   * @param rows
   * @param trackBy
   */
  public updateData(
    rows: FsListAbstractRow | FsListAbstractRow[],
    trackBy?: FsListTrackByTargetRowFn,
  ): boolean {
    if (Array.isArray(rows)) {
      let updateSuccess = false;

      rows.forEach((item) => {
        if (this.updateRow(item, trackBy)) {
          updateSuccess = true;
        }
      });

      this._updateVisibleRows();

      return updateSuccess;
    } else {
      const updated = this.updateRow(rows, trackBy);

      this._updateVisibleRows();

      return updated;
    }
  }

  /**
   * Remove data for specified row
   * @param data
   */
  public removeData(data: FsListAbstractRow | FsListAbstractRow[] | FsListTrackByTargetRowFn): boolean {
    const removedRows = [];

    const defaultTrackBy = (row, target) => {
      return row === target;
    };

    if (Array.isArray(data)) {
      //
      data.forEach((item) => {
        removedRows.push(...this.removeRow(item, defaultTrackBy));
      });
    } else if (isFunction(data)) {
      removedRows.push(...this.removeRow(null, (data as FsListTrackByTargetRowFn)));
    } else if (isObject(data)) {
      removedRows.push(...this.removeRow(data, defaultTrackBy));
    }

    if (removedRows.length > 0) {
      this._updateVisibleRows();

      this._rowsRemoved$.next(removedRows)
    }

    return !!removedRows.length;
  }

  public swapRows(row1, row2) {
    let tmpEl;
    const rowsStack = this._rowsStack;
    const row1GlobalIndex = rowsStack.indexOf(row1);
    const row2GlobalIndex = rowsStack.indexOf(row2);

    tmpEl = rowsStack[row1GlobalIndex];
    rowsStack[row1GlobalIndex] = rowsStack[row2GlobalIndex];
    rowsStack[row2GlobalIndex] = tmpEl;

    this._rowsStack = [ ...rowsStack ];
  }

  public swapSelectedRows(selectedRows: Map<any, any>, swappedIndex: number, activeIndex: number, trackBy: string) {
    const rowsStack = [...this._rowsStack];
    const swappedRow = rowsStack[swappedIndex];
    const activeRow = rowsStack[activeIndex];

    let index = 0;
    // indexing base rows
    rowsStack.forEach((row) => {
      row.index = index;
      index++;
    });

    const selectedRowsArray = Array.from(selectedRows)
      .map(el => el[1]);

    let swappedElIndex;

    if (swappedIndex > activeIndex) {
      swappedElIndex = rowsStack.indexOf(swappedRow);
    } else {
      swappedElIndex = rowsStack.indexOf(activeRow) - 1;
    }

    const sliceOfSelectedRows = [];

    selectedRowsArray.forEach((selectedRow) => {
      const ind = rowsStack
        .findIndex((row: Row) => row.data[trackBy] === selectedRow[trackBy]);
      const slicedSelectedRow = rowsStack.splice(ind, 1)[0];
      slicedSelectedRow.visible = false;
      sliceOfSelectedRows.push(slicedSelectedRow);
    });

    const startSlice = rowsStack.splice(0, swappedElIndex);

    const reorderedRowsStack = [...startSlice].concat([...sliceOfSelectedRows]).concat([...rowsStack]);
    this._rowsStack = [...reorderedRowsStack];
  }

  public makeAllVisible(): void {
    this._rowsStack.forEach((row: Row) => row.visible = true);
  }

  public destroy() {
    this._destroyRowsStack();
    this._store.clear();

    this._destroy$.next();
    this._destroy$.complete();
  }

  public toggleRowGroup(rowData) {
    const row = this.visibleRows.find((visibleRow) => visibleRow.data === rowData );
    row.toggleRowExpandStatus();

    this._updateVisibleRows();
  }

  private _updateRowsStack(rows) {
    this._destroyRowsStack();

    if (this.groupEnabled) {
      this._store.clear();
      this._rowsStack = [...this.groupRowsBy(rows)];
    } else {
      rows = rows.map((row) => {
        return new Row(
          row,
          RowType.Simple,
          { initialExpand: this._initialExpand },
        );
      });
      this._rowsStack = [...rows];
    }
  }

  private _extendRowsStack(rows) {
    if (this.groupEnabled) {
      this._rowsStack = [...this.groupRowsBy(rows)];
    } else {
      rows = rows.map((row) => {
        return new Row(
          row,
          RowType.Simple,
          { initialExpand: this._initialExpand },
        );
      });
      this._rowsStack = [...this._rowsStack, ...rows];
    }
  }

  private _destroyRowsStack() {
    this._rowsStack.forEach((row) => row.destroy());
  }

  private _updateVisibleRows() {
    this.visibleRows = this._rowsStack
      .filter((row) => {
        return (!row.isChild && !row.isGroupFooter) || row.visible;
      });
  }

  private updateRow(
    targetRow: FsListAbstractRow,
    trackBy?: (listRow: FsListAbstractRow, targetRow?: FsListAbstractRow) => boolean) {

    if (trackBy === void 0) {
      trackBy = (row, target) => {
        return row === target;
      }
    }

    const targetIndex = this._rowsStack.findIndex((listRow) => trackBy(listRow.data, targetRow));

    if (targetIndex !== -1) {
      const updateTarget = this._rowsStack[targetIndex];
      const updatedData = Object.assign({}, updateTarget.data, targetRow);

      this._rowsStack[targetIndex] = new Row(
        updatedData,
        updateTarget.type,
        {
          parent: updateTarget.parent,
          initialExpand: updateTarget.expanded,
        }
      );

      return true;
    }

    return false;
  }

  /**
   * Remove row from
   * @param targetRow
   * @param trackBy
   */
  private removeRow(
    targetRow: FsListAbstractRow | null,
    trackBy?: FsListTrackByTargetRowFn
  ) {

    const rows = this._rowsStack;
    const removedRows = [];

    rows.forEach((listRow, index) => {
      if (trackBy(listRow.data, targetRow)) {
        const removedRow = rows.splice(index, 1);

        removedRows.push(removedRow);
      }
    });

    return removedRows;
  }

  /**
   * Split existing rows by groups and store them for future use
   */
  private groupRowsBy(rows) {
    if (!this._groupByFn || !this._compareByFn) { return rows }

    const groupRows: GroupRow[] = [];
    const footerRows = new Map();

    rows.forEach((row) => {
      const mainGroup = this._groupByFn(row);
      const mainGroupKey = this._compareByFn(mainGroup);

      if (!this._store.has(mainGroupKey)) {
        const group = new GroupRow(
          mainGroup,
          this._initialExpand,
        );

        group.index = groupRows.length;
        groupRows.push(group);

        const childRow = new ChildRow(row, group);

        this._store.set(mainGroupKey, group);
        group.children.push(childRow);
      } else {
        const group = this._store.get(mainGroupKey);
        const childRow = new ChildRow(row, group);

        group.children.push(childRow);
      }
    });

    groupRows.forEach((groupRow) => {
      const footerIndex = groupRow.children
        .findIndex((row) => {
          return this._footerRowFn(row.data, {
            ...groupRow.data,
            children: groupRow.childrenData
          });
        });

      if (footerIndex !== -1) {
        const footerRow = groupRow.children.slice(footerIndex, footerIndex + 1)[0];
        groupRow.children.push(new GroupFooterRow(footerRow.data, groupRow));
      }
    });

    return Array.from(this._store.values())
      .reduce((acc, item) => {
        if (item.isGroup) {
          acc.push(item, ...item.children);
        } else {
          acc.push(item);
        }

        return acc;
      }, []);
  }
}
