import { Observable, Subject } from 'rxjs';
import { RowType } from '../enums/row-type.enum';
import { FsListReorderData } from '../interfaces';
import { ChildRow } from './row/child-row';
import { GroupFooterRow } from './row/group-footer-row';
import { GroupRow } from './row/group-row';
import { SimpleRow } from './row/simple-row';

export class Row {

  private _row: (SimpleRow | ChildRow | GroupRow);

  private _actionsUpdate$ = new Subject();

  constructor(
    data: any = {},
    rowType: RowType = RowType.Simple,
    { parent, initialExpand }: { parent?: GroupRow, initialExpand?: boolean } = {},
  ) {
    switch (rowType) {
      case RowType.Simple: {
        this._row = new SimpleRow(data);
      } break;

      case RowType.Group: {
        this._row = new GroupRow(data, initialExpand);
      } break;

      case RowType.GroupChild: {
        this._row = new ChildRow(data, parent);
      } break;
    }
  }

  public get index(): number {
    return this._row.index;
  }

  public get actionsUpdate$(): Observable<any> {
    return this._actionsUpdate$.asObservable();
  }

  public actionsUpdate(): void {
    return this._actionsUpdate$.next(null);
  }

  public set index(value: number) {
    this._row.index = value;
  }

  public get readyToSwap(): boolean {
    return this._row.readyToSwap;
  }

  public get visible(): boolean {
    return (this._row as ChildRow).visible;
  }

  public set readyToSwap(value: boolean) {
    this._row.readyToSwap = value;
  }

  public get data(): any {
    return this._row.data;
  }

  public get type(): RowType {
    return this._row.type;
  }

  public get isGroup(): boolean {
    return this._row instanceof GroupRow;
  }

  public get isGroupChild(): boolean {
    return this._row instanceof ChildRow;
  }

  public get isGroupFooter(): boolean {
    return this._row instanceof GroupFooterRow;
  }

  public get parent(): GroupRow {
    return (this._row as ChildRow).parent;
  }

  public get children(): (ChildRow | GroupFooterRow)[] {
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

  public getReorderData(): FsListReorderData {
    return this._row.getReorderData();
  }

  public destroy() {
    this._row.destroy();
  }
}
