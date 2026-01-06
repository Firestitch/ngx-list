import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { MatIconButton } from '@angular/material/button';

import { FsFile } from '@firestitch/file';

import { Row } from '../../../../../models/row';
import { RowAction } from '../../../../../models/row-action.model';
import { FsRowInlineButtonContentComponent } from '../button-content/button-content.component';


@Component({
  selector: 'fs-list-row-inline-icon-button',
  templateUrl: './icon-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    MatIconButton,
    FsRowInlineButtonContentComponent,
  ],
})
export class FsRowInlineIconButtonComponent {

  @Input()
  public rowAction: RowAction;

  @Input()
  public row: Row;

  @Output()
  public clicked = new EventEmitter();

  @Output()
  public fileSelect = new EventEmitter<FsFile | FsFile[]>();

  public actionClick(event: Event): void {
    this.clicked.emit(event);
  }

  public fileSelected(event: FsFile | FsFile[]): void {
    this.fileSelect.emit(event);
  }
}

