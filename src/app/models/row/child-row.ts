import { RowType } from '../../enums/row-type.enum';
import { FsListReorderData } from '../../interfaces';

import { BaseRow, IBaseRow } from './_base-row';
import { IGroupRow } from './group-row';


export interface IBaseChildRow extends IBaseRow {
  type: RowType.GroupChild | RowType.GroupFooter;

  parent: IGroupRow;
  visible: boolean;
}

export interface IChildRow extends IBaseChildRow {
  type: RowType.GroupChild;
}

export class ChildRow extends BaseRow<RowType.GroupChild> implements IChildRow {

  protected readonly _rowType: RowType.GroupChild = RowType.GroupChild;

  private _visible = true;
  private readonly _parent: IGroupRow;

  constructor(
    data: object = {},
    parent: IGroupRow = null,
  ) {
    super(data);

    this._parent = parent;

    if (this.parent) {
      this._visible = this._parent.expanded;
      this.index = this.parent.children.length;
    }
  }


  public get visible(): boolean {
    return this._visible;
  }

  public set visible(value: boolean) {
    this._visible = value;
  }

  public get parent(): IGroupRow {
    return this._parent;
  }

  public reorderData(): FsListReorderData {
    return {
      type: this._rowType,
      data: this.data,
      parent: this.parent.reorderData(),
    };
  }

  public destroy() {}
}
