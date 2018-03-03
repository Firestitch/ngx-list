import { Alias, Model } from 'tsmodels';

export class Action extends Model {

  public primary = true; //TODO make it as @Alias after tsmodels release
  @Alias() public icon: string;
  @Alias() public label: string;
  @Alias() public menu: boolean;
  @Alias() public click: Function;

  constructor(config: any = {}) {
    super();

    this._fromJSON(config);
  }

  public _fromJSON(value: any) {
    super._fromJSON(value);

    if (value.primary === false) {
      this.primary = false;
    }
  }
}
