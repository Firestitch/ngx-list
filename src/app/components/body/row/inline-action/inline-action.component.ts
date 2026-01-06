import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
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
import { MatIcon } from '@angular/material/icon';

import { FsFile, FsFileModule } from '@firestitch/file';

import { ActionType } from '../../../../enums/action-type.enum';
import { Row } from '../../../../models/row';
import { RowAction } from '../../../../models/row-action.model';

import { FsRowInlineIconButtonComponent } from './icon-button/icon-button.component';


@Component({
  selector: 'fs-list-row-inline-action',
  styleUrls: ['./inline-action.component.scss'],
  templateUrl: './inline-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgTemplateOutlet,
    MatAnchor,
    RouterLink,
    MatButton,
    MatFabButton,
    MatFabAnchor,
    MatMiniFabButton,
    MatMiniFabAnchor,
    MatIcon,
    FsFileModule,
    AsyncPipe,
    FsRowInlineIconButtonComponent,
  ],
})
export class FsRowInlineActionComponent implements OnInit, OnChanges {

  @Input()
  public rowAction: RowAction;

  @Input()
  public row: Row;

  @Output()
  public clicked = new EventEmitter();

  @Output()
  public fileSelect = new EventEmitter<FsFile | FsFile[]>();


  public icon: string;
  
  public ngOnChanges(changes: SimpleChanges): void {
    if(changes.row) {
      this.icon = this.rowAction.getRowIcon(this.row.data);
    }
  }

  public actionClick(event) {
    this.clicked.emit(event);
  }

  public ngOnInit(): void {
    if(!this.rowAction.label && this.rowAction.icon) {
      this.rowAction.type = ActionType.Icon;
    }
  }

  public fileSelected(event): void {
    this.fileSelect.emit(event);
  }
}
