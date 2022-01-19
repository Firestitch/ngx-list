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
  private _actionsController: ActionsController;

  private _enabled$ = new BehaviorSubject<boolean>(false);
  private _manualReorderActivated$ = new BehaviorSubject(false);
  private _reorderDisabled$ = new BehaviorSubject(false);

  private _numberOfActiveFilters = 0;

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
        map(() => {
          return this._numberOfActiveFilters === 0;
        }),
        distinctUntilChanged(),
        shareReplay(),
      )
  }

  public get rightReorderActivated$(): Observable<boolean> {
    return this._enabled$
      .pipe(
        map((enabled) => {
          return enabled && this.position === ReorderPosition.Right;
        }),
        map(() => {
          return this._numberOfActiveFilters === 0;
        }),
        distinctUntilChanged(),
        shareReplay(),
      )
  }

  public get reorderDisabled$(): Observable<boolean> {
    return this._reorderDisabled$.asObservable();
  }

  public get reorderDisabled(): boolean {
    return this._reorderDisabled$.getValue();
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
    this._actionsController = actionsController;

    if (this.strategy === ReorderStrategy.Always) {
      this.enableReorder();
    } else if (this.strategy === ReorderStrategy.Manual) {
      actionsController.addReorderAction(
        {
          label: this.label || 'Reorder',
          menu: this.menu,
          primary: false,
          click: () => {
            this.enableReorder();
          },
          disabled: () => {
            return this.reorderDisabled;
          }
        }
      );

      actionsController.addReorderDoneAction({
          label: 'Done',
          primary: false,
          click: () => {
            this.disableReorder();
          },
          disabled: () => {
            return this.reorderDisabled;
          },
        }
      )
    }
  }

  public enableReorder() {
    if (this.strategy === ReorderStrategy.Manual || this.strategy === ReorderStrategy.Custom) {
      const returnedValue = this.startCallback();

      if (returnedValue && returnedValue instanceof Observable) {
        this.disableReorderAction();

        returnedValue
          .pipe(
            takeUntil(this._destroy$),
          )
          .subscribe(() => {
            this.enabled = true;
            this.enableReorderAction();
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
        this.disableReorderAction();

        returnedValue
          .pipe(
            takeUntil(this._destroy$),
          )
          .subscribe(() => {
            this.enabled = false;
            this.enableReorderAction();
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

  /**
   * Enable reorder action and update filter actions state
   */
  public enableReorderAction() {
    this._reorderDisabled$.next(false);
    this._actionsController.updateDisabledState();
  }

  /**
   * Disable reorder action and update filter actions state
   */
  public disableReorderAction() {
    this._reorderDisabled$.next(true);
    this._actionsController.updateDisabledState();
  }

  public setNunberOfActiveFilters(activeFilters: number) {
    this._numberOfActiveFilters = activeFilters;

    this.enabled = this.enabled;
  }
}
