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
  @Alias() public show: Function;

  public classArray: string[] = [];

  public isShown = true;

  constructor(config: any = {}) {
    super();

    this._fromJSON(config);
  }

  public _fromJSON(value: any) {
    super._fromJSON(value);

    if (value.type === void 0) {
      this.type = ActionType.basic;
    }

    // Re-assign click function
    const clickFn = value.click;
    value.click = (row, event, rowActionsRef = null) => {
      this.clickEvent(row, event, rowActionsRef, clickFn)
    };

    if (this.className) {
      this.classArray = this.className.split(' ').reduce((acc, elem) => {
        acc.push(elem);

        return acc;
      }, []);
    }
  }

  public checkShowStatus(row) {
    if (this.show) {
      this.isShown = this.show(row);
    }
  }

  private clickEvent(row, event, rowActionsRef, clickFn) {
    // Stop event propagation for parent
    event.stopPropagation();

    // Close menu
    if (rowActionsRef) {
      rowActionsRef.close.emit();
    }

    if (clickFn) {
      // Fire passed callback
      clickFn(row, event);
    }
  }
}
