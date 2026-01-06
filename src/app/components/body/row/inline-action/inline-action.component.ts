import { AsyncPipe, NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  MatAnchor,
  MatButton,
  MatFabAnchor,
  MatFabButton,
  MatMiniFabAnchor,
  MatMiniFabButton,
} from '@angular/material/button';

import { FsFile } from '@firestitch/file';

import { ActionType } from '../../../../enums/action-type.enum';
import { Row } from '../../../../models/row';
import { RowAction } from '../../../../models/row-action.model';

import { FsRowInlineButtonContentComponent } from './button-content/button-content.component';
import { FsRowInlineIconButtonComponent } from './icon-button/icon-button.component';
import { FsRowInlineIconLinkComponent } from './icon-link/icon-link.component';


@Component({
  selector: 'fs-list-row-inline-action',
  styleUrls: ['./inline-action.component.scss'],
  templateUrl: './inline-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    MatAnchor,
    RouterLink,
    MatButton,
    MatFabButton,
    MatFabAnchor,
    MatMiniFabButton,
    MatMiniFabAnchor,
    AsyncPipe,
    FsRowInlineButtonContentComponent,
    FsRowInlineIconButtonComponent,
    FsRowInlineIconLinkComponent,
  ],
})
export class FsRowInlineActionComponent implements OnInit {

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

  public ngOnInit(): void {
    if(!this.rowAction.label && this.rowAction.icon) {
      this.rowAction.type = ActionType.Icon;
    }
  }

  public fileSelected(event: FsFile | FsFile[]): void {
    this.fileSelect.emit(event);
  }
}
