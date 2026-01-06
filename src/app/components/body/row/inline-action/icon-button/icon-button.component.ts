import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatIconAnchor, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { FsFile, FsFileModule } from '@firestitch/file';

import { Row } from '../../../../../models/row';
import { RowAction } from '../../../../../models/row-action.model';


@Component({
  selector: 'fs-list-row-inline-icon-button',
  templateUrl: './icon-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgTemplateOutlet,
    RouterLink,
    MatIconButton,
    MatIconAnchor,
    MatIcon,
    FsFileModule,
    AsyncPipe,
  ],
})
export class FsRowInlineIconButtonComponent {

  @Input()
  public rowAction: RowAction;

  @Input()
  public row: Row;

  @Input()
  public icon: string;

  @Input()
  public buttonContent: TemplateRef<any>;

  @Output()
  public clicked = new EventEmitter();

  @Output()
  public fileSelect = new EventEmitter<FsFile | FsFile[]>();

  public actionClick(event): void {
    this.clicked.emit(event);
  }

  public fileSelected(event): void {
    this.fileSelect.emit(event);
  }
}

