import { ActionType } from '../enums/action-type.enum';
import {
  FsListRowActionFile,
  FsListRowActionLink,
  FsListRowActionLinkFn,
} from '../interfaces';


export class RowAction {

  public icon: string;
  public menu: boolean;
  public remove: { title: string; template: string };
  public className: string;
  public type: ActionType;
  public show: Function;
  public restore: boolean;
  public rowActions: RowAction[];
  public label = '';
  public routerLink: FsListRowActionLink;
  public classArray: string[] = [];
  public isShown = true;
  public click: Function;

  public fileConfig: FsListRowActionFile;

  private _linkFn: FsListRowActionLinkFn;
  private readonly _isGroup: boolean = false;

  constructor(config: any = {}) {
    this._init(config);

    if (Array.isArray(this.rowActions)) {
      this._isGroup = true;
    }
  }

  public get isGroup() {
    return this._isGroup;
  }

  public _init(value: any) {
    this.icon = value.icon;
    this.menu = value.menu ?? true;
    this.remove = value.remove;
    this.className = value.className;
    this.type = this.menu && this.icon && !this.label && !value.type ? ActionType.Icon : value.type ?? ActionType.Basic;
    this.show = value.show;
    this.restore = value.restore;
    this.rowActions = value.rowActions
      ?.map((action) => new RowAction(action));


    // Re-assign click function
    const clickFn = value.click;
    this.click = (row, event, index, rowActionsRef = null) => {
      return this._clickEvent(row, event, index, rowActionsRef, clickFn);
    };

    this._linkFn = value.link;

    if (value.file) {
      this.fileConfig = { ...value.file };

      if (this.fileConfig.select) {
        const selectFn = this.fileConfig.select;
        this.fileConfig.select = (selection, row, index) => {
          selectFn(selection, row, index);
        };
      }
    }

    this.label = value.label;

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

      const groupVisible = !this.show || this.show(row, index);

      this.isShown = groupVisible && this.rowActions.some((action) => action.isShown);
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

  private _clickEvent(row, event, index, rowActionsRef, clickFn) {
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
