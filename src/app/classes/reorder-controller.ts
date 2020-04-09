import { Alias, Model } from 'tsmodels';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { List } from './list-controller';
import { FsListReorderDoneCallback, FsListReorderMovedCallback } from '../interfaces';
import { Row } from '../models/row.model';


export enum ReorderPosition {
  Left = 'left',
  Right = 'right',
}

export enum ReorderStrategy {
  Always = 'always',
  Manual = 'manual',
  Custom = 'custom',
}


export class ReorderController extends Model {
  @Alias() public start: () => void | Observable<void>;
  @Alias() public moved: FsListReorderMovedCallback;
  @Alias() public done: FsListReorderDoneCallback;
  @Alias() public status: boolean;
  @Alias() public label: string;
  @Alias() public menu: boolean;
  @Alias() public position: ReorderPosition;
  @Alias() public strategy: ReorderStrategy;

  private _enabled = false;
  private _manualReorderActivated$ = new BehaviorSubject(false);
  private _reorderDisabled$ = new BehaviorSubject(false);
  private _destroy$ = new Subject();

  constructor(private _list: List, data: any = {}) {
    super();

    this._fromJSON(data);
  }

  get enabled() {
    return this._enabled;
  }

  set enabled(value) {
    this._enabled = value;

    this._manualReorderActivated$.next(this.enabled && this.strategy === ReorderStrategy.Manual);
  }

  get manualReorderActivated$() {
    return this._manualReorderActivated$.asObservable();
  }

  get reorderDisabled$() {
    return this._reorderDisabled$.asObservable();
  }

  public _fromJSON(data) {
    super._fromJSON(data);

    if (data.menu === void 0) { // FIXME must be fixed after tsmodels defaults will be released
      this.menu = true;
    }

    if (data.position === void 0) {
      this.position = ReorderPosition.Left;
    }

    if (data.strategy === void 0) {
      this.strategy = ReorderStrategy.Manual;
    } else if (data.strategy === ReorderStrategy.Always) {
      this.enableReorder();
    }

    if (data.status === void 0) {
      this.status = true;
    }
  }

  public dragStart() {
    if (this.start && this.strategy === ReorderStrategy.Always) {
      this.start();
    }
  }

  public dragEnd(rows: Row[]) {
    if (this.moved) {
      this.moved(this._list.dataController.visibleRowsData);
    }

    if (this.strategy === ReorderStrategy.Always) {
      if (this.done) {
        this.done(this._list.dataController.visibleRowsData);
      }
    }

    this._list.dataController.updateOrderByRows(rows);
  }

  public enableReorder() {
    if (this.strategy === ReorderStrategy.Manual || this.strategy === ReorderStrategy.Custom) {
      const returnedValue = this.start();

      if (returnedValue && returnedValue instanceof Observable) {
        this._reorderDisabled$.next(true);
        returnedValue
          .pipe(
            takeUntil(this._destroy$),
          )
          .subscribe(() => {
            this._reorderDisabled$.next(false);
            this.enabled = true;
          });

        return;
      }
    }

    this.enabled = true;
  }

  public disableReorder() {
    if (this.strategy === ReorderStrategy.Manual || this.strategy === ReorderStrategy.Custom) {
      const returnedValue = this.reorderFinished();

      if (returnedValue && returnedValue instanceof Observable) {
        this._reorderDisabled$.next(true);
        returnedValue
          .pipe(
            takeUntil(this._destroy$),
          )
          .subscribe(() => {
            this.enabled = false;
            this._reorderDisabled$.next(false);
          });

        return;
      }
    }

    this.enabled = false;
  }

  /**
   * Exec end callback
   */
  public reorderFinished() {
    if (this.done) {
      return this.done(this._list.dataController.visibleRowsData);
    }
  }

  public destroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
