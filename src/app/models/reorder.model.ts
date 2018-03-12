import { Alias, Model } from 'tsmodels';

export class ReorderModel extends Model {
  @Alias() done: Function;
  @Alias() label: string;
  @Alias() menu: boolean;

  constructor(data: any = {}) {
    super();

    this._fromJSON(data);
  }

  public _fromJSON(data) {
    super._fromJSON(data);

    if (data.menu === void 0) { // FIXME must be fixed after tsmodels defaults will be released
      this.menu = true;
    }
  }
}
