import { RowType } from '../../enums/row-type.enum';
import { FsListReorderData } from '../../interfaces';

export abstract class BaseRow {

  public index: number;
  public readyToSwap = true;

  protected readonly _rowType: RowType;

  private readonly _data: any = {};

  constructor(
    data: any = {},
    rowType = RowType.Simple,
  ) {
    this._data = data;
    this._rowType = rowType;
  }

  public get data() {
    return this._data;
  }

  public get type() {
    return this._rowType;
  }

  public getReorderData(): FsListReorderData<unknown> {
    return {
      type: this._rowType,
      data: this.data,
      parent: null,
    }
  }

  public abstract destroy();
}
