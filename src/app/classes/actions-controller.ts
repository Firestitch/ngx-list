import { Observable, Subject } from 'rxjs';

import { FilterComponent } from '@firestitch/filter';
import { FsListAction } from '../interfaces/listconfig.interface';


export class ActionsController {

  private _filterRef: FilterComponent;

  private _actions: FsListAction[] = [];
  private _reorderAction: FsListAction;
  private _doneAction: FsListAction;

  private _destroy$ = new Subject<void>();

  constructor() {}

  public get destroy$(): Observable<void> {
    return this._destroy$.asObservable();
  }

  public get actions(): FsListAction[] {
    return this._actions;
  }

  public get hasActions(): boolean {
    return this._actions.length > 0;
  }

  public setFilterRef(ref: FilterComponent) {
    this._filterRef = ref;
  }

  public setActions(actions: FsListAction[]) {
    this.clearActions();
    this._actions = actions;

    if (this._reorderAction) {
      this._actions.unshift(this._reorderAction);
    }
  }

  public addReorderAction(action: FsListAction) {
    const actionClickFn = action.click;
    this._actions.unshift(action);

    action.click = () => {
      this._filterRef.updateActions([this._doneAction]);
      this._filterRef.hideKeywordField();
      this._filterRef.hideFiltersBtn();
      actionClickFn(null);
    }

    this._reorderAction = action;
  }

  public addReorderDoneAction(action: FsListAction) {
    this._doneAction = action;
    const actionClickFn = action.click;

    this._doneAction.click = () => {
      this._filterRef.updateActions(this._actions);
      this._filterRef.showKeywordField();
      this._filterRef.showFiltersBtn();
      actionClickFn(null);
    }
  }

  public clearActions() {
    this._actions = [];
    this._destroy$.next();
  }

  public updateDisabledState(): void {
    this._filterRef.updateDisabledState();
  }
}
