import { Alias, Model } from 'tsmodels';
import { ActionType } from '../enums/button-type.enum';
import { FsListRowActionLabelFn, FsListRowActionLink, FsListRowActionLinkFn } from '../interfaces';


export class RowAction extends Model {

  @Alias() public icon: string;
  @Alias() public menu: boolean;
  @Alias() public remove: { title: string; template: string; };
  @Alias() public className: string;
  @Alias() public type: ActionType;
  @Alias() public show: Function;
  @Alias() public restore: boolean;
  @Alias('rowActions', RowAction) public rowActions: RowAction[];

  public label = '';
  public routerLink: FsListRowActionLink;
  public classArray: string[] = [];
  public isShown = true;
  public click: Function;

  private _linkFn: FsListRowActionLinkFn;
  private _labelFn: FsListRowActionLabelFn;
  private readonly _isGroup: boolean = false;

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
    this.click = (row, event, index, rowActionsRef = null) => {
      return this.clickEvent(row, event, index, rowActionsRef, clickFn);
    };

    this._linkFn = value.link;

    if (typeof value.label === 'function') {
      this._labelFn = value.label

      this.label = '';
    } else {
      this.label = value.label;
    }

    if (this.className) {
      this.classArray = this.className.split(' ').reduce((acc, elem) => {
        acc.push(elem);

        return acc;
      }, []);
    }
  }

  public checkShowStatus(row, index) {
    if (this.isGroup) {
      this.rowActions.forEach((action) => {
        action.checkShowStatus(row, index);
      });

      this.isShown = this.rowActions.some((action) => action.isShown);
    } else if (this.show) {
      this.isShown = this.show(row, index);
    }
  }

  public updateLink(row) {
    if (!this.isShown) {
      return;
    }

    if (this.isGroup) {
      this.rowActions.forEach((action) => {
        action.updateLink(row);
      });
    } else if (this._linkFn) {
      this.routerLink = this._linkFn(row);

      if (this.routerLink && !this.routerLink.target) {
        this.routerLink.target = null;
      }
    }
  }

  public updateLabel(row): void {
    if (!this.isShown) {
      return;
    }

    if (this.isGroup) {
      this.rowActions.forEach((action) => {
        action.updateLabel(row);
      });
    } else if (this._labelFn) {
      this.label = this._labelFn(row);
    }
  }

  private clickEvent(row, event, index, rowActionsRef, clickFn) {
    // Stop event propagation for parent
    event.stopPropagation();

    // Close menu
    if (rowActionsRef) {
      rowActionsRef.closeMenu();
    }

    if (clickFn) {
      // Fire passed callback
      return clickFn(row, event, index);
    }
  }
}
