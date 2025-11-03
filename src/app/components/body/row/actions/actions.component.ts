import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, inject } from '@angular/core';

import { MatIcon } from '@angular/material/icon';

import { FsMenuModule } from '@firestitch/menu';
import { FsPrompt } from '@firestitch/prompt';

import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { Row } from '../../../../models/row';
import { RowAction } from '../../../../models/row-action.model';
import { ActionLabelPipe } from '../../../../pipes/action-label';
import { FsRowInlineActionComponent } from '../inline-action/inline-action.component';
import { FsRowMenuActionComponent } from '../menu-action/menu-action.component';


@Component({
  selector: 'fs-list-row-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsRowInlineActionComponent,
    NgClass,
    FsMenuModule,
    FsRowMenuActionComponent,
    MatIcon,
    ActionLabelPipe,
  ],
})
export class FsRowActionsComponent {

  @Input()
  public row: Row;

  @Input()
  public index: number;

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
  private _prompt = inject(FsPrompt);


  public actionClick(action: RowAction, row: any, event: any, menuRef?) {
    if (action.remove) {
      if (
        action.remove instanceof Object
      ) {
        this._prompt.confirm({
          title: action.remove.title,
          template: action.remove.template,
          autofocus: true,
        })
          .pipe(
            take(1),
            takeUntil(this._destroy$),
          )
          .subscribe(() => {
            this._removeAction(action, row.data, event, this.index);
          });
      } else {
        this._removeAction(action, row.data, event, this.index);

      }
    } else {
      action.click(row.data, event, this.index, menuRef);
    }
  }

  /**
   * Track By for improve change detection
   *
   * @param index
   */
  public trackByFn(index) {
    return index;
  }

  /**
   * Emit that some row must be removed
   *
   * @param action
   * @param row
   * @param event
   * @param index
   */
  private _removeAction(action, row, event, index) {
    const removeObservable = action.click(row, event, index);

    if (removeObservable && removeObservable instanceof Observable) {
      removeObservable
        .pipe(
          take(1),
          takeUntil(this._destroy$),
        )
        .subscribe(() => {
          this.rowRemoved.emit(row);
        });
    } else {
      this.rowRemoved.emit(row);
    }
  }
}
