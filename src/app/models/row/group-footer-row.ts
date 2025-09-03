import { BaseRow } from './_base-row';
import { RowType } from '../../enums/row-type.enum';
import { IGroupRow } from './group-row';
import { IBaseChildRow } from './child-row';

export interface IGroupFooterRow extends IBaseChildRow {
  type: RowType.GroupFooter;
}

export class GroupFooterRow extends BaseRow<RowType.GroupFooter> implements IGroupFooterRow{

  protected readonly _rowType: RowType.GroupFooter = RowType.GroupFooter;

  private _visible = true;
  private readonly _parent: IGroupRow;

  constructor(
    data: object = {},
    parent: IGroupRow = null,
  ) {
    super(data);

    this._parent = parent;

    if (this.parent) {
      this.visible = this._parent.expanded;
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

  public destroy() {}
}
