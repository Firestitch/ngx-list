import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isFunction, isObject } from 'lodash-es';

import { RowType } from '../enums/row-type.enum';
import { FsListState } from '../enums/state.enum';
import { FsListAbstractRow, FsListGroupConfig, FsListTrackByTargetRowFn } from '../interfaces/listconfig.interface';
import { Row, isChildTypeRow, isGroupRow, makeRowFactory } from '../models/row';
import { IChildRow } from '../models/row/child-row';
import { IGroupFooterRow } from '../models/row/group-footer-row';
import { IGroupRow } from '../models/row/group-row';


export class DataController {

  private readonly _visibleRows$ = new BehaviorSubject<Row[]>([]);
  private readonly _rowsRemoved$ = new Subject<Row[]>();
  private readonly _remoteRowsChange$ = new Subject<void>();

  private _store = new Map();
  private _rowsStack: Row[] = [];
  private _operation: FsListState;

  private _groupByFn: (row) => any[];
  private _footerRowFn: (
    row: { [key: string]: any },
    group: {
      [key: string]: any,
      children: {
        [key: string]: any
      }[],
    }
  ) => boolean;
  private _compareByFn: (group) => any;
  private _initialExpand = true;
  private _groupEnabled = false;

  private _loadMoreEnabled: boolean;

  private _hasData = false;

  private readonly _destroy$ = new Subject<void>();

  public get visibleRowsData() {
    return this.visibleRows.map((row) => row.data);
  }

  public get rowsStack() {
    return this._rowsStack.slice();
  }

  public get groupEnabled() {
    return this._groupEnabled;
  }

  public set groupEnabled(value: boolean) {
    this._groupEnabled = value;
  }

  public get remoteRowsChange$() {
    return this._remoteRowsChange$.pipe(
      takeUntil(this._destroy$),
    );
  }

  public get rowsRemoved$() {
    return this._rowsRemoved$.pipe(
      takeUntil(this._destroy$),
    );
  }

  public get hasData() {
    return this._hasData;
  }

  public get operation() {
    return this._operation;
  }

  public get visibleRows$(): Observable<Row[]> {
    return this._visibleRows$.asObservable();
  }

  public set visibleRows(value: any[]) {
    this._visibleRows$.next(value);
    this._hasData = this.visibleRows.length > 0;
  }

  public get visibleRows() {
    return this._visibleRows$.getValue();
  }

  public get visibleRowsCount() {
    return this.visibleRows.length;
  }

  public get hasGroups() {
    return this._compareByFn && this._groupByFn;
  }

  public get reorderData() {
    return this._rowsStack
      .map((row) => row.reorderData());
  }

  public setGroupConfig(group: FsListGroupConfig) {
    if (group) {
      this._groupByFn = group.groupBy;
      this._compareByFn = group.compareBy;
      this._footerRowFn = group.footer || (() => false);
      this._initialExpand = group.initialExpand ?? true;

      // group mode enabled by default
      this._groupEnabled = (group.enabled !== undefined)
        ? group.enabled
        : true;
    }
  }

  public setAdditionalConfigs(configs: { loadMoreEnabled: boolean }) {
    this._loadMoreEnabled = configs.loadMoreEnabled;
  }

  /**
   * Rows what was received from fetch function
   * @param rows
   */
  public setRowsFromResponse(rows: any[]) {
    if (
      this._operation === FsListState.LoadMore ||
        (this._operation === FsListState.PageChange && this._loadMoreEnabled)
    ) {
      this._extendRowsStack(rows);
    } else {
      this._updateRowsStack(rows);
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
        if (this._updateRow(item, trackBy)) {
          updateSuccess = true;
        }
      });

      return updateSuccess;
    }
   
    return this._updateRow(rows, trackBy);
  }

  /**
   * Remove data for specified row
   * @param data
   */
  public removeData(
    data: FsListAbstractRow | FsListAbstractRow[] | FsListTrackByTargetRowFn,
  ): boolean {
    const removedRows = [];

    const defaultTrackBy = (row, target) => {
      return row === target;
    };

    if (Array.isArray(data)) {
      //
      data.forEach((item) => {
        removedRows.push(...this._removeRow(item, defaultTrackBy));
      });
    } else if (isFunction(data)) {
      removedRows.push(...this._removeRow(null, (data as FsListTrackByTargetRowFn)));
    } else if (isObject(data)) {
      removedRows.push(...this._removeRow(data, defaultTrackBy));
    }

    if (removedRows.length > 0) {
      this._updateVisibleRows();

      this._rowsRemoved$.next(removedRows);
    }

    return !!removedRows.length;
  }

  public swapRows(row1, row2, selectedRows?: Row[], isMultipleDrag = false) {
    const rowsStack = this._rowsStack;
    const row1GlobalIndex = rowsStack.indexOf(row1);
    const row2GlobalIndex = rowsStack.indexOf(row2);

    const tmpEl = rowsStack[row1GlobalIndex];
    rowsStack[row1GlobalIndex] = rowsStack[row2GlobalIndex];
    rowsStack[row2GlobalIndex] = tmpEl;

    if (isMultipleDrag && Array.isArray(selectedRows)) {
      if (!selectedRows.includes(row1)) {
        selectedRows = [row1, ...selectedRows];
      }

      selectedRows
        .filter((selectedRow) => {
          return selectedRow !== row1;
        })
        .forEach((selectedRow) => {
          const idx = rowsStack.indexOf(selectedRow);
          rowsStack.splice(idx, 1);
        });

      const indexToInsertAfter = rowsStack.indexOf(tmpEl);

      rowsStack.splice(indexToInsertAfter, 1);

      selectedRows.forEach((selectedRow, offset) => {
        rowsStack.splice(indexToInsertAfter + offset, 0, selectedRow);
      });
    }

    this._rowsStack = [...rowsStack];
  }

  public destroy() {
    this._destroyRowsStack();
    this._store.clear();

    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public toggleRowGroup(rowData) {
    const row: IGroupRow = this.visibleRows.find((visibleRow) => visibleRow.data === rowData );
    row?.toggleRowExpandStatus();

    this._updateVisibleRows();
  }

  public finishReorder(): void {
    // TODO fixme remove or improve
    if (this.groupEnabled) {
      let group: IGroupRow;

      this._rowsStack
        .forEach((row, index) => {
          if (isGroupRow(row) && row !== group) {
            group = row;
          } else {
            row.index = index - this._rowsStack.indexOf(group) - 1;
          }
        });
    }

    this._updateVisibleRows();
  }

  private _updateRowsStack(rows) {
    this._destroyRowsStack();

    if (this.groupEnabled) {
      this._store.clear();
      this._rowsStack = [...this._groupRowsBy(rows)];
    } else {
      rows = rows.map((row) => {
        return makeRowFactory(row, RowType.Simple);
      });
      this._rowsStack = [...rows];
    }
  }

  private _extendRowsStack(rows) {
    if (this.groupEnabled) {
      this._rowsStack = [...this._groupRowsBy(rows)];
    } else {
      rows = rows.map((row) => {
        return makeRowFactory(row, RowType.Simple);
      });
      this._rowsStack = [...this._rowsStack, ...rows];
    }
  }

  private _destroyRowsStack() {
    this._rowsStack.forEach((row) => row.destroy());
  }

  private _updateVisibleRows() {
    this.visibleRows = this._rowsStack
      .filter((row: Row) => {
        return !isChildTypeRow(row) || row.visible;
      });
  }

  private _updateRow(
    updatedRow: FsListAbstractRow,
    trackBy?: (listRow: FsListAbstractRow, targetRow?: FsListAbstractRow) => boolean) {

    if (trackBy === undefined) {
      trackBy = (row, target) => {
        return row === target;
      };
    }

    const targetIndex = this._rowsStack
      .findIndex((listRow) => trackBy(listRow.data, updatedRow));

    if (targetIndex !== -1) {
      const targetRow = this._rowsStack[targetIndex];
      const updatedData = { ...targetRow.data, ...updatedRow };
      
      targetRow.data = updatedData;

      return true;
    }

    return false;
  }

  /**
   * Remove row from
   * @param targetRow
   * @param trackBy
   */
  private _removeRow(
    targetRow: FsListAbstractRow | null,
    trackBy?: FsListTrackByTargetRowFn,
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
  private _groupRowsBy(rows) {
    if (!this._groupByFn || !this._compareByFn) {
      return rows;
    }

    const groupRows: IGroupRow[] = [];

    rows.forEach((row) => {
      const groupData = this._groupByFn(row);
      const groupKey = this._compareByFn(groupData);

      let group: IGroupRow = this._store.get(groupKey);

      if (!group) {
        group = makeRowFactory(
          groupData,
          RowType.Group,
          { initialExpand: this._initialExpand },
        ) as IGroupRow;

        group.index = groupRows.length;
        groupRows.push(group);

        this._store.set(groupKey, group);
      }

      const childRow = makeRowFactory(row, RowType.GroupChild, { parent: group }) as IChildRow;
      group.children.push(childRow);
    });

    groupRows.forEach((groupRow) => {
      const footerIndex = groupRow.children
        .findIndex((row) => {
          return this._footerRowFn(row.data, {
            ...groupRow.data,
            children: groupRow.childrenData,
          });
        });

      if (footerIndex !== -1) {
        const footerRow = groupRow.children.splice(footerIndex, footerIndex + 1)[0];
        const newRow = makeRowFactory(footerRow.data, RowType.GroupFooter, { parent: groupRow });
        groupRow.children.push(newRow as IGroupFooterRow);
      }
    });

    return Array.from(this._store.values())
      .reduce((acc, item) => {
        if (isGroupRow(item)) {
          acc.push(item, ...item.children);
        } else {
          acc.push(item);
        }

        return acc;
      }, []);
  }
}
