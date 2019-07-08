import { Alias, Model } from 'tsmodels';
import { ActionType } from '../enums/button-type.enum';
import { FsListRowAction } from '../interfaces/listconfig.interface';

export class RowAction extends Model {

  @Alias() public icon: string;
  @Alias() public label: string;
  @Alias() public menu: boolean;
  @Alias() public remove: { title: string; template: string; };
  @Alias() public click: Function;
  @Alias() public className: string;
  @Alias() public type: ActionType;
  @Alias() public show: Function;
  @Alias() public restore: boolean;
  @Alias('rowActions', RowAction) public rowActions: RowAction[];

  public classArray: string[] = [];

  public isShown = true;

  private _isGroup = false;

  constructor(config: any = {}) {
    super();

    this._fromJSON(config);

    if (Array.isArray(this.rowActions)) {
      this._isGroup = true;
    }
  }

  get isGroup() {
    return this._isGroup;
  }

  public _fromJSON(value: any) {
    super._fromJSON(value);

    if (value.type === void 0) {
      this.type = ActionType.Basic;
    }

    if (this.menu === void 0) {
      this.menu = true;
    }

    // Re-assign click function
    const clickFn = value.click;
    value.click = (row, event, rowActionsRef = null) => {
      return this.clickEvent(row, event, rowActionsRef, clickFn);
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
      return clickFn(row, event);
    }
  }
}
