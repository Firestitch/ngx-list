import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { MatIcon } from '@angular/material/icon';

import { FsFile, FsFileModule } from '@firestitch/file';

import { Row } from '../../../../../models/row';
import { RowAction } from '../../../../../models/row-action.model';


@Component({
  selector: 'fs-list-row-inline-button-content',
  templateUrl: './button-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIcon,
    FsFileModule,
  ],
})
export class FsRowInlineButtonContentComponent implements OnChanges {

  @Input()
  public rowAction: RowAction;

  @Input()
  public row: Row;

  @Output()
  public fileSelect = new EventEmitter<FsFile | FsFile[]>();

  public icon: string;

  public ngOnChanges(changes: SimpleChanges): void {
    if((changes.row || changes.rowAction) && this.rowAction && this.row) {
      this.icon = this.rowAction.getRowIcon(this.row.data);
    }
  }

  public fileSelected(event: FsFile | FsFile[]): void {
    this.fileSelect.emit(event);
  }
}

