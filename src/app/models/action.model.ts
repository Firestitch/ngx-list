import { Alias, Model } from 'tsmodels';

export class Action extends Model {
  public primary = true; //TODO make it as @Alias after tsmodels release
  @Alias() public icon: string;
  @Alias() public label: string;
  @Alias() public click: Function;

  constructor(config: any = {}) {
    super();

    if (config.primary === false) {
      this.primary = false;
    }

    this._fromJSON(config);
  }
}
