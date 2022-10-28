import { BaseRow } from './base-row';
import { RowType } from '../../enums/row-type.enum';
import { GroupRow } from './group-row';
import { FsListReorderData } from '../../interfaces';


export class ChildRow extends BaseRow {

  public visible = true;
  private readonly _parent: GroupRow;

  constructor(
    data: any = {},
    parent: GroupRow = null,
  ) {
    super(data, RowType.Child);

    this._parent = parent;

    if (this.parent) {
      this.visible = this._parent.expanded;
      this.index = this.parent.children.length;
    }
  }

  public get parent(): GroupRow {
    return this._parent;
  }

  public get isChild(): boolean {
    return true;
  }

  public getReorderData(): FsListReorderData {
    return {
      type: this._rowType,
      data: this.data,
      parent: this.parent.getReorderData(),
    }
  }

  public destroy() {}
}
