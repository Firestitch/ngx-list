import { Alias, Model } from 'tsmodels';

export enum ActionType {
  basic = 'basic',
  raised = 'raised',
  icon = 'icon',
  fab = 'fab',
  miniFab = 'mini-fab'
}

export class RowAction extends Model {

  @Alias() public icon: string;
  @Alias() public label: string;
  @Alias() public menu: boolean;
  @Alias() public click: Function;
  @Alias() public className: string;
  @Alias() public type: ActionType;

  public classArray: string[] = [];

  constructor(config: any = {}) {
    super();

    this._fromJSON(config);
  }

  public _fromJSON(value: any) {
    super._fromJSON(value);

    if (value.type === undefined) {
      this.type = ActionType.basic;
    }

    if (this.className) {
      this.classArray = this.className.split(' ').reduce((acc, elem) => {
        acc.push(elem);

        return acc;
      }, []);
    }
  }
}
