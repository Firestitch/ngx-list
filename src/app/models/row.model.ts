import { BehaviorSubject } from 'rxjs';

export class Row {

  public data: any = {};
  public children: Row[] = [];
  public isGroup = false;

  private _expanded = new BehaviorSubject<boolean>(false);

  constructor(data: any = {}, isGroup = false, initialExpand = false) {
    this.data = data;
    this.isGroup = isGroup;

    if (initialExpand) {
      this._expanded.next(initialExpand);
    }
  }

  get expanded() {
    return this._expanded.getValue();
  }

  get expanded$() {
    return this._expanded.asObservable();
  }

  public toggleRowExpandStatus() {
    this._expanded.next(!this.expanded);
  }

  public destroy() {
    this.children.forEach((child) => child.destroy());
    this._expanded.complete();
  }
}
