import { Injectable, OnDestroy } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, takeUntil } from 'rxjs/operators';

import {
  FsListReorderDoneCallback,
  FsListReorderMovedCallback,
  FsListReorderMoveInGroupCallback
} from '../interfaces';

import { DataController } from './data-controller';
import { ActionsController } from './actions-controller';
import { Action } from '../models/action.model';

export enum ReorderPosition {
  Left = 'left',
  Right = 'right',
}

export enum ReorderStrategy {
  Always = 'always',
  Manual = 'manual',
  Custom = 'custom',
}

@Injectable()
export class ReorderController implements OnDestroy {

  public startCallback: () => void | Observable<void>;
  public movedCallback: FsListReorderMovedCallback;
  public doneCallback: FsListReorderDoneCallback;
  public moveDropCallback: FsListReorderMoveInGroupCallback;

  public status: boolean;
  public label: string;
  public menu: boolean;
  public position: ReorderPosition;
  public strategy: ReorderStrategy;

  private _dataController: DataController;

  private _enabled$ = new BehaviorSubject<boolean>(false);
  private _manualReorderActivated$ = new BehaviorSubject(false);
  private _reorderDisabled$ = new BehaviorSubject(false);

  private _destroy$ = new Subject();

  constructor() {}

  public get enabled() {
    return this._enabled$.getValue();
  }

  public set enabled(value) {
    this._enabled$.next(value);

    this._manualReorderActivated$.next(this.enabled && this.strategy === ReorderStrategy.Manual);
  }

  public get dataController() {
    return this._dataController;
  }

  public get manualReorderActivated$(): Observable<boolean> {
    return this._manualReorderActivated$.asObservable();
  }

  public get leftReorderActivated$(): Observable<boolean> {
    return this._enabled$
      .pipe(
        map((enabled) => {
          return enabled && this.position === ReorderPosition.Left;
        }),
        distinctUntilChanged(),
        shareReplay(),
        takeUntil(this._destroy$),
      )
  }

  public get rightReorderActivated$(): Observable<boolean> {
    return this._enabled$
      .pipe(
        map((enabled) => {
          return enabled && this.position === ReorderPosition.Right;
        }),
        distinctUntilChanged(),
        shareReplay(),
        takeUntil(this._destroy$),
      )
  }

  public get reorderDisabled$(): Observable<boolean> {
    return this._reorderDisabled$.asObservable();
  }

  public initWithConfig(data, dataController: DataController, actionsController: ActionsController) {
    if (!data) { return }

    this.menu = data.menu ?? true;
    this.position = data.position ?? ReorderPosition.Left;
    this.strategy = data.strategy ?? ReorderStrategy.Manual;
    this.status = data.status ?? true;
    this.label = data.label;

    this.startCallback = data.start;
    this.movedCallback = data.moved;
    this.doneCallback = data.done;
    this.moveDropCallback = data.moveDrop;

    this._dataController = dataController;

    if (this.strategy === ReorderStrategy.Always) {
      this.enableReorder();
    } else if (this.strategy === ReorderStrategy.Manual) {
      const action = new Action({
        label: this.label || 'Reorder',
        menu: this.menu,
        primary: false,
        click: () => {
          this.enableReorder();
        }
      });

      actionsController.addReorderAction(action);
    }
  }

  public enableReorder() {
    if (this.strategy === ReorderStrategy.Manual || this.strategy === ReorderStrategy.Custom) {
      const returnedValue = this.startCallback();

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
    if (this.doneCallback) {
      return this.doneCallback(this._dataController.reorderData);
    }
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
