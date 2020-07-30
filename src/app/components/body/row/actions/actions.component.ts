import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { FsPrompt } from '@firestitch/prompt';

import { RowAction } from '../../../../models/row-action.model';
import { Row } from '../../../../models/row';


@Component({
  selector: 'fs-list-row-actions',
  templateUrl: './actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsRowActionsComponent {

  @Input()
  public row: Row;

  @Input()
  public restoreMode = false;

  @Input()
  public rowActions: RowAction[] = [];

  @Input()
  public rowRemoved: EventEmitter<any>;

  @Input()
  public menuRowActions: RowAction[] = [];

  @Input()
  public inlineRowActions: RowAction[] = [];

  @Input()
  public restoreAction: RowAction;

  private _destroy$ = new Subject();

  constructor(
    private _fsPrompt: FsPrompt,
  ) {}

  public actionClick(action: RowAction, row: any, event: any, menuRef?) {
    if (action.remove) {
      if (typeof action.remove === 'boolean') {
        this.removeAction(action, row.data, event);
      } else {
        this._fsPrompt.confirm({
          title: action.remove.title,
          template: action.remove.template,
        }).pipe(
          take(1),
          takeUntil(this._destroy$),
        ).subscribe({
          next: () => {
            this.removeAction(action, row.data, event);
          },
          error: () => {},
        })
      }
    } else {
      action.click(row.data, event, menuRef);
    }
  }

  /**
   * Track By for improve change detection
   * @param index
   */
  public trackByFn(index) {
    return index;
  }

  public clickOnTrigger(event) {
    event.stopPropagation();
  }

  /**
   * Emit that some row must be removed
   * @param action
   * @param row
   * @param event
   */
  private removeAction(action, row, event) {
    const removeObservable = action.click(row, event);

    if (removeObservable && removeObservable instanceof Observable) {
      removeObservable
        .pipe(
          take(1),
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this.rowRemoved.emit(row);
        });
    }
  }
}
