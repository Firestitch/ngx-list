import { Alias, Model } from 'tsmodels';

export class Action extends Model {

  public primary = true; //TODO make it as @Alias after tsmodels release
  @Alias() public icon: string;
  @Alias() public label: string;
  @Alias() public menu: boolean;
  @Alias() public className: string;
  @Alias() public click: Function;

  public classArray: string[] = [];

  constructor(config: any = {}) {
    super();

    this._fromJSON(config);
  }

  public _fromJSON(value: any) {
    super._fromJSON(value);

    if (value.primary === false) {
      this.primary = false;
      this.classArray = [];
    }

    if (value.click === void 0) {
      this.click = () => { }
    }

    if (this.className) {
      this.classArray = this.className.split(' ').reduce((acc, elem) => {
        acc.push(elem);

        return acc;
      }, []);
    }

    if (this.primary) {
      this.classArray.push('mat-primary');
    }
  }
}
