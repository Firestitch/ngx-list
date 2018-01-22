import { Alias, Model } from 'tsmodels';

export class Column extends Model {
  @Alias() public title;
  @Alias() public align;
  @Alias() public name;
  @Alias('class') public cssClass;

  constructor(colConfig = {}) {
    super();
    this._fromJSON(colConfig);
  }

  get cssClasses() {
    return `${(this.cssClass || '')}`;
  }
}
