import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isFunction, isObject } from 'lodash-es';

import { Operation } from '../enums/operation.enum';
import {
  FsListAbstractRow,
  FsListGroupConfig,
  FsListTrackByTargetRowFn
} from '../interfaces/listconfig.interface';
import { Row } from '../models/row.model';


export class DataController {

  private readonly _visibleRows$ = new BehaviorSubject<Row[]>([]);
  private readonly _rowsRemoved$ = new Subject<Row[]>();
  private readonly _remoteRowsChange$ = new Subject<void>();

  private _store = new Map();
  private _rowsStack: Row[] = [];
  private _operation: Operation;

  private _groupByFn: (row) => any[];
  private _compareByFn: (group) => any;
  private _initialExpand = true;
  private _groupModeEnabled = false;

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

  public setGroupConfig(group: FsListGroupConfig) {
    if (group) {
      this._groupByFn = group.groupBy;
      this._compareByFn = group.compareBy;
      this._groupModeEnabled = true;
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
        case Operation.filter:
        case Operation.reload:
        case Operation.sort: {
          this._updateRowsStack(rows);
        } break;

        default: {
          this._extendRowsStack(rows);
        }
      }

      this._remoteRowsChange$.next();
    } else {
      if (
        this._operation === Operation.loadMore ||
        (this._operation === Operation.pageChange && this._loadMoreEnabled)
      ) {
        this._extendRowsStack(rows);
      } else {
        this._updateRowsStack(rows);
      }
    }

    this._operation = Operation.idle;

    this._setVisibleRows();
  }

  /**
   * Set current operation for list data flow
   * @param value
   */
  public setOperation(value: Operation) {
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
    const rowIndex = this.visibleRows.findIndex((listRow) => {
      return trackBy(listRow, targetRow);
    });

    if (rowIndex > -1) {
      this.visibleRows[rowIndex] = targetRow;

      this.visibleRows = [...this.visibleRows];

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

      this.visibleRows = [...this.visibleRows];

      return updateSuccess;
    } else {
      const updated = this.updateRow(rows, trackBy);

      this.visibleRows = [...this.visibleRows];

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
      this.visibleRows = [...this.visibleRows];

      this._rowsRemoved$.next(removedRows)
    }

    return !!removedRows.length;
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

    this._setVisibleRows();
  }

  private _updateRowsStack(rows) {

    this._destroyRowsStack();

    if (this._groupModeEnabled) {
      this._store.clear();
      this.groupRowsBy(rows);
      this._rowsStack = [...this._store.values()];
    } else {
      rows = rows.map((row) => new Row(row));
      this._rowsStack = [...rows];
    }
  }

  private _extendRowsStack(rows) {
    if (this._groupModeEnabled) {
      this.groupRowsBy(rows);
      this._rowsStack = [...<any>this._store.values()];
    } else {
      rows = rows.map((row) => new Row(row));
      this._rowsStack = [...this._rowsStack, ...rows];
    }
  }

  private _destroyRowsStack() {
    this._rowsStack.forEach((row) => row.destroy());
  }

  private _setVisibleRows() {
    const visibleRows = [];

    this._rowsStack.forEach((row) => {
      visibleRows.push(row);

      if (row.isGroup && row.expanded) {
        visibleRows.push(...row.children);
      }
    });

    this.visibleRows = visibleRows;
  }

  private updateRow(
    targetRow: FsListAbstractRow,
    trackBy?: (listRow: FsListAbstractRow, targetRow?: FsListAbstractRow) => boolean) {

    if (trackBy === void 0) {
      trackBy = (row, target) => {
        return row === target;
      }
    }

    const targetIndex = this.visibleRows.findIndex((listRow) => trackBy(listRow, targetRow));

    if (targetIndex !== -1) {
      const updateTarget = this.visibleRows[targetIndex];

      this.visibleRows[targetIndex] = Object.assign({}, updateTarget, targetRow);

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

    const removedRows = [];

    this.visibleRows.forEach((listRow, index) => {
      if (trackBy(listRow, targetRow)) {
        removedRows.push(...this.visibleRows.splice(index, 1));
      }
    });

    return removedRows;
  }

  /**
   * Split existing rows by groups and store them for future use
   */
  private groupRowsBy(rows) {
    if (!this._groupByFn || !this._compareByFn) { return rows }

    rows.forEach((row) => {
      const mainGroup = this._groupByFn(row);
      const mainGroupKey = this._compareByFn(mainGroup);

      if (mainGroupKey) {
        if (!this._store.has(mainGroupKey)) {
          const group = new Row(mainGroup, true, this._initialExpand);
          this._store.set(mainGroupKey, group);
          group.children.push(new Row(row));
        } else {
          const group = this._store.get(mainGroupKey);
          group.children.push(new Row(row));
        }
      } else {
        throw Error(`compareBy callback is not specified or returned wrong result for ${row}`);
      }
    })
  }
}
