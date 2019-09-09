import { Action } from '../models/action.model';
import { FsListAction } from '../interfaces/listconfig.interface';

export class ActionsController {

  public menuActions: Action[] = [];
  public kebabActions: Action[] = [];

  private _actions: Action[] = [];
  private _reorderAction: Action;

  constructor() {}

  get actionsList() {
    return this._actions;
  }

  public setActions(actions: FsListAction[]) {
    this._actions = actions.map((action) => new Action(action));

    if (this._reorderAction) {
      this._actions.unshift(this._reorderAction);
    }

    this._classifyActions();
  }

  public addAction(action: Action) {
    this._actions.push(action);

    this._classifyAction(action);
  }

  public addReorderAction(action: Action) {
    this._actions.unshift(action);

    this._classifyAction(action);
    this._reorderAction = action;
  }

  public clearActions() {
    this._actions = [];
    this.kebabActions = [];
    this.menuActions = [];
  }

  private _classifyActions() {
    this.menuActions = [];
    this.kebabActions = [];

    this._actions.forEach((action) => {
      this._classifyAction(action);
    })
  }

  private _classifyAction(action: Action) {
    if (action.menu) {
      this.kebabActions.push(action);
    } else {
      this.menuActions.push(action);
    }
  }
}
