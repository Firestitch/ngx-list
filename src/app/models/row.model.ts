import { BehaviorSubject } from 'rxjs';

export class Row {

  public data: any = {};
  public children: Row[] = [];
  public isGroup = false;

  private _opened = new BehaviorSubject<boolean>(false);

  constructor(data: any = {}, isGroup = false) {
    this.data = data;
    this.isGroup = isGroup;
  }

  get opened() {
    return this._opened.getValue();
  }

  get opened$() {
    return this._opened.asObservable();
  }

  public toggleRowOpenStatus() {
    this._opened.next(!this.opened);
  }

  public destroy() {
    this.children.forEach((child) => child.destroy());
    this._opened.complete();
  }
}
