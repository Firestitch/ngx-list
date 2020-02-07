import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, HostBinding,
  Input,
  Output,
} from '@angular/core';

import { FsPrompt } from '@firestitch/prompt';

import { RowAction } from '../../../../models/row-action.model';


@Component({
  selector: 'fs-list-row-inline-action',
  templateUrl: './inline-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsRowInlineActionComponent {

  @Input()
  public action: RowAction;

  @Output()
  public clicked = new EventEmitter();

  constructor(
    private _fsPrompt: FsPrompt,
  ) {}

  public actionClick(event) {
    this.clicked.emit(event);
  }
}
