import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { Operation } from '../enums/operation.enum';
import { FsListAbstractRow, FsListTrackByTargetRowFn } from '@firestitch/list';
import { isFunction, isObject } from 'rxjs/internal-compatibility';

export class DataController {

  private readonly _visibleRows$ = new BehaviorSubject<any[]>([]);
  private readonly _dataChange$ = new Subject<any>();
  private readonly _rowsRemoved$ = new Subject<any[]>();

  private _operation: Operation;

  private _hasData = false;

  private readonly _destroy$ = new Subject<void>();

  constructor(
    private _infinityScrollEnabled: boolean,
    private _loadMoreEnabled: boolean
  ) {}

  get data$() {
    return this._visibleRows$;
  }

  get data() {
    return this._visibleRows$.getValue();
  }

  get dataChange$() {
    return this._dataChange$.asObservable();
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
    this._hasData = this.data.length > 0;
  }

  get visibleRowsCount() {
    return this.data.length;
  }

  public setRowsFromResponse(rows: any[]) {
    if (this._infinityScrollEnabled) {
      switch (this._operation) {
        case Operation.filter:
        case Operation.reload:
        case Operation.sort: {
          this.visibleRows = [...rows];
        } break;

        default: {
          this.visibleRows = [ ...this.data, ...rows ];
        }
      }
    } else {
      if (
        this._operation === Operation.loadMore ||
        (this._operation === Operation.pageChange && this._loadMoreEnabled)
      ) {
        this.visibleRows = [ ...this.data, ...rows ];
      } else {
        this.visibleRows = [...rows];
      }
    }

    this._operation = Operation.idle;
  }

  public setOperation(value: Operation) {
    this._operation = value;
  }

  public clearRows() {
    this.visibleRows = [];
  }

  public replaceData(
    targetRow: FsListAbstractRow,
    trackBy?: FsListTrackByTargetRowFn
  ) {
    const rowIndex = this.data.findIndex((listRow) => {
      return trackBy(listRow, targetRow);
    });

    if (rowIndex > -1) {
      this.data[rowIndex] = targetRow;

      this.visibleRows = [...this.data];

      return true;
    } else {
      return false;
    }

  }

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

      this.visibleRows = [...this.data];

      return updateSuccess;
    } else {
      const updated = this.updateRow(rows, trackBy);

      this.visibleRows = [...this.data];

      return updated;
    }
  }

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
      this.visibleRows = [...this.data];

      this._rowsRemoved$.next(removedRows)
    }

    return !!removedRows.length;
  }

  public destroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private updateRow(
    targetRow: FsListAbstractRow,
    trackBy?: (listRow: FsListAbstractRow, targetRow?: FsListAbstractRow) => boolean) {

    if (trackBy === void 0) {
      trackBy = (row, target) => {
        return row === target;
      }
    }

    const targetIndex = this.data.findIndex((listRow) => trackBy(listRow, targetRow));

    if (targetIndex !== -1) {
      const updateTarget = this.data[targetIndex];

      this.data[targetIndex] = Object.assign({}, updateTarget, targetRow);

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

    this.data.forEach((listRow, index) => {
      if (trackBy(listRow, targetRow)) {
        removedRows.push(...this.data.splice(index, 1));
      }
    });

    return removedRows;
  }

  // private _listenDataChange() {
  //   this._dataChange$.pipe(
  //     takeUntil(this._destroy$),
  //   ).subscribe((rows) => {
  //
  //   });
  // }
}
