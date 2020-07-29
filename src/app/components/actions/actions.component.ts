import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from '../../models/action.model';


@Component({
  selector: 'fs-list-actions',
  templateUrl: './actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsActionsComponent {

  @Input()
  public kebabActions: Action[] = [];

  @Input()
  public menuActions: Action[] = [];

  @Input()
  public manualReorderActivated: boolean | undefined = false;

  @Input()
  public reorderDisabled: boolean | undefined = false;

  @Output()
  public reorderFinished = new EventEmitter<void>();

  public finishReorder() {
    this.reorderFinished.emit();
  }
}
