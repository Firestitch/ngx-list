import { RowType } from '../enums/row-type.enum';
import { ChildRow } from './row/child-row';
import { GroupRow } from './row/group-row';
import { SimpleRow } from './row/simple-row';

export class Row {

  private _row: (SimpleRow | ChildRow | GroupRow);

  constructor(
    data: any = {},
    rowType: RowType = RowType.Simple,
    { parent, initialExpand }: { parent?: GroupRow, initialExpand?: boolean } = null,
  ) {
    switch (rowType) {
      case RowType.Simple: {
        this._row = new SimpleRow(data);
      } break;

      case RowType.Group: {
        this._row = new GroupRow(data, initialExpand);
      } break;

      case RowType.Child: {
        this._row = new ChildRow(data, parent);
      } break;
    }
  }

  public get index(): number {
    return this._row.index;
  }

  public set index(value: number) {
    this._row.index = value;
  }

  public get data(): any {
    return this._row.data;
  }

  public get type(): RowType {
    return this._row.type;
  }

  public get isGroup(): boolean {
    return (this._row as GroupRow).isGroup;
  }

  public get isChild(): boolean {
    return (this._row as ChildRow).isChild;
  }

  public get parent(): GroupRow {
    return (this._row as ChildRow).parent;
  }

  public get children(): ChildRow[] {
    return (this._row as GroupRow).children;
  }

  public get expanded() {
    return (this._row as GroupRow).expanded;
  }

  public get expanded$() {
    return (this._row as GroupRow).expanded$;
  }

  public updateChildrenIndexes() {
    (this._row as GroupRow).updateChildrenIndexes();
  }

  public toggleRowExpandStatus() {
    (this._row as GroupRow).toggleRowExpandStatus();
  }

  public destroy() {
    this._row.destroy();
  }
}
