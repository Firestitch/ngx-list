export class Row {

  public data = {};
  public children = [];
  public isGroup = false;
  public opened = false;

  constructor(data: any = {}, isGroup = false) {
    this.data = data;
    this.isGroup = isGroup;

    /*if (groupBy) {
      debugger;
      const children = groupBy(data);

      if (Array.isArray(children)) {
        this.children = children.map((child) => new Row(child));
        this.isGroup = true;
      }
    }*/
  }

  public toggleRowOpenStatus() {
    this.opened = !this.opened;
  }
}
