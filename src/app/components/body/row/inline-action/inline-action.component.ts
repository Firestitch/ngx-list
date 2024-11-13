import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { FsFile } from '@firestitch/file';

import { ActionType } from '../../../../enums/action-type.enum';
import { RowAction } from '../../../../models/row-action.model';


@Component({
  selector: 'fs-list-row-inline-action',
  styleUrls: ['./inline-action.component.scss'],
  templateUrl: './inline-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsRowInlineActionComponent implements OnInit {
  
  public actionType: ActionType;

  @Input()
  public action: RowAction;

  @Output()
  public clicked = new EventEmitter();

  @Output()
  public fileSelect = new EventEmitter<FsFile | FsFile[]>();

  public actionClick(event) {
    this.clicked.emit(event);
  }

  public ngOnInit(): void {
    this.actionType = this.action.type;

    if(!this.action.label && this.action.icon) {
      this.actionType = ActionType.Icon;
    }
  }

  public fileSelected(event): void {
    this.fileSelect.emit(event);
  }
}
