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

import { FsFile } from '@firestitch/file';

import { ActionType } from '../../../../enums/action-type.enum';
import { Row } from '../../../../models/row';
import { RowAction } from '../../../../models/row-action.model';


@Component({
  selector: 'fs-list-row-inline-action',
  styleUrls: ['./inline-action.component.scss'],
  templateUrl: './inline-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsRowInlineActionComponent implements OnInit, OnChanges {
  
  public actionType: ActionType;

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
    this.actionType = this.rowAction.type;

    if(!this.rowAction.label && this.rowAction.icon) {
      this.actionType = ActionType.Icon;
    }
  }

  public fileSelected(event): void {
    this.fileSelect.emit(event);
  }
}
