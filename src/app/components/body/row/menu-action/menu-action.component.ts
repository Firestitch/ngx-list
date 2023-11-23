import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, Output,
} from '@angular/core';

import { FsMenuComponent } from '@firestitch/menu';

import { FsListRowActionFile } from '../../../../interfaces/listconfig.interface';
import { Row } from '../../../../models/row';


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

  constructor(
    private _menu: FsMenuComponent,
  ) { }

  public selectFile(event): void {
    this.fileSelect.emit(event);
    this.closeMenu();
  }

  public errorFile(event): void {
    this.fileError.emit(event);
    this.closeMenu();
  }

  public closeMenu(): void {
    this._menu.closeMenu();
  }
}
