import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, Output,
} from '@angular/core';

import { Row } from '../../../../models/row';
import { FsListRowActionFile } from '../../../../interfaces/listconfig.interface';


@Component({
  selector: 'fs-list-row-menu-action',
  templateUrl: './menu-action.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsRowMenuActionComponent {

  @Input()
  public row: Row;

  @Input()
  public icon: string;

  @Input()
  public label: string;

  @Input()
  public file: FsListRowActionFile;

  @Output()
  public fileSelect = new EventEmitter();

  @Output()
  public fileError = new EventEmitter();

}
