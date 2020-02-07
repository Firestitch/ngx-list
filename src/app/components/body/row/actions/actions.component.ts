import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { FsPrompt } from '@firestitch/prompt';

import { RowAction } from '../../../../models/row-action.model';
import { Row } from '../../../../models/row.model';


@Component({
  selector: 'fs-list-row-actions',
  templateUrl: './actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsRowActionsComponent implements OnChanges {

  @Input()
  public row: Row;

  @Input()
  public restoreMode = false;

  @Input()
  public rowActions: RowAction[] = [];

  @Input()
  public menuRowActions: RowAction[] = [];

  @Input()
  public inlineRowActions: RowAction[] = [];

  @Input()
  public restoreAction: RowAction;

  private _destroy$ = new Subject();

  constructor(
    private _fsPrompt: FsPrompt,
    private _cdRef: ChangeDetectorRef,
  ) {
    this._cdRef.detach();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._cdRef.detectChanges();
  }

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
          // this.rowRemoved.emit(row);
        });
    }
  }
}
