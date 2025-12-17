import { BehaviorSubject, Observable, map } from 'rxjs';

import { ActionType } from '../enums/action-type.enum';
import {
  FsListRowActionFile,
  FsListRowActionLink,
  FsListRowActionLinkFn,
  FsListRowActionRemove,
} from '../interfaces';


export class RowAction {

  public icon: string | ((row: any) => string);
  public menu: boolean;
  public remove: FsListRowActionRemove | boolean;
  public className: string;
  public type: ActionType;
  public show: (row: any, index: number) => boolean;
  public restore: boolean;
  public rowActions: RowAction[];
  public label = '';
  public routerLink: FsListRowActionLink;
  public classArray: string[] = [];
  public click: (row: any, event: any, index: number, rowActionsRef?: RowAction) => void;

  public fileConfig: FsListRowActionFile;

  private _linkFn: FsListRowActionLinkFn;
  private readonly _isGroup: boolean = false;
  private _visible = new BehaviorSubject<boolean>(true);

  constructor(config: any = {}) {
    this._init(config);

    if (Array.isArray(this.rowActions)) {
      this._isGroup = true;
    }
  }

  public get isGroup() {
    return this._isGroup;
  }

  public getRowIcon(row: any) {
    return typeof this.icon === 'function' ? this.icon(row) : this.icon;
  }

  public get visible$(): Observable<boolean> {
    return this._visible.asObservable();
  }

  public get hidden$(): Observable<boolean> {
    return this._visible
      .pipe(map((visible) => !visible));
  }

  public get visible(): boolean {
    return this._visible.getValue();
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

      this._visible.next(groupVisible && this.rowActions.some((action) => action.visible));
    } else if (this.show) {
      this._visible.next(this.show(row, index));
    }
  }

  public updateLink(row) {
    if (!this.visible) {
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
