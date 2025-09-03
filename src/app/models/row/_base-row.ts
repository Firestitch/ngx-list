import { Observable, Subject } from 'rxjs';

import { RowType } from '../../enums/row-type.enum';
import { FsListReorderData } from '../../interfaces';

export interface IBaseRow {
  data: object;
  index: number;
  readyToSwap: boolean;
  actionsUpdated$: Observable<void>;
  updateActions(): void;
  reorderData(): FsListReorderData;

  destroy(): void;
}

export abstract class BaseRow<T = RowType> implements IBaseRow{

  protected readonly _rowType: T;

  private _index: number;
  private _readyToSwap = true;
  private _actionsUpdated$ = new Subject<void>();

  private _data: object = {};

  constructor(
    data: object = {},
  ) {
    this._data = data;
  }

  public get data(): object {
    return this._data;
  }

  public get type(): T {
    return this._rowType;
  }

  public get index(): number {
    return this._index;
  }

  public set index(value: number) {
    this._index = value;
  }

  public get readyToSwap(): boolean {
    return this._readyToSwap;
  }

  public set readyToSwap(value: boolean) {
    this._readyToSwap = value;
  }

  public get actionsUpdated$(): Observable<void> {
    return this._actionsUpdated$.asObservable();
  }

  public updateActions(): void {
    return this._actionsUpdated$.next();
  }

  public reorderData(): FsListReorderData {
    return {
      type: this._rowType as RowType,
      data: this.data,
      parent: null,
    }
  }

  public abstract destroy();
}
