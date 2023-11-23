import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { FsFile } from '@firestitch/file';

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

  @Output()
  public fileSelect = new EventEmitter<FsFile | FsFile[]>();

  public actionClick(event) {
    this.clicked.emit(event);
  }

  public fileSelected(event): void {
    this.fileSelect.emit(event);
  }
}
