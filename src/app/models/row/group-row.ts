import { BehaviorSubject, Observable } from 'rxjs';

import { RowType } from '../../enums/row-type.enum';

import { BaseRow, IBaseRow } from './_base-row';
import { IChildRow } from './child-row';
import { IGroupFooterRow } from './group-footer-row';


export interface IGroupRow extends IBaseRow {
  type: RowType.Group;

  childrenData: unknown[];
  expanded: boolean;
  expanded$: Observable<boolean>;
  toggleRowExpandStatus(): void;
  children: (IChildRow | IGroupFooterRow)[];
}

export class GroupRow extends BaseRow<RowType.Group> implements IGroupRow {

  protected readonly _rowType: RowType.Group = RowType.Group;

  private _children: (IChildRow | IGroupFooterRow)[] = [];

  private readonly _expanded = new BehaviorSubject<boolean>(false);

  constructor(
    data: object = {},
    initialExpand = false,
  ) {
    super(data);

    if (initialExpand) {
      this._expanded.next(initialExpand);
    }
  }

  public get children(): (IChildRow | IGroupFooterRow)[] {
    return this._children;
  }

  public get childrenData() {
    return this._children
      .map((child) => child.data);
  }


  public get expanded(): boolean {
    return this._expanded.getValue();
  }

  public get expanded$(): Observable<boolean> {
    return this._expanded.asObservable();
  }

  public toggleRowExpandStatus(): void {
    this._expanded.next(!this.expanded);

    this._updateChildrenVisibility();
  }

  public destroy() {
    this._children.forEach((child) => child.destroy());

    this._expanded.complete();
  }

  private _updateChildrenVisibility(): void {
    this._children.forEach((row) => {
      row.visible = this.expanded;
    });
  }

}
