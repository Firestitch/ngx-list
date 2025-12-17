import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';

import { MatIcon } from '@angular/material/icon';

import { FsFileModule } from '@firestitch/file';
import { FsMenuComponent } from '@firestitch/menu';

import { FsListRowActionFile } from '../../../../interfaces/listconfig.interface';
import { Row } from '../../../../models/row';
import { RowAction } from '../../../../models/row-action.model';
import { ActionLabelPipe } from '../../../../pipes/action-label';


@Component({
  selector: 'fs-list-row-menu-action',
  templateUrl: './menu-action.component.html',
  styleUrl: './menu-action.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatIcon,
    FsFileModule,
    ActionLabelPipe,
  ],
})
export class FsRowMenuActionComponent implements OnInit, OnChanges {

  @Input()
  public row: Row;

  @Input()
  public rowAction: RowAction;

  @Input()
  public file: FsListRowActionFile;

  @Output()
  public fileSelect = new EventEmitter();

  @Output()
  public fileError = new EventEmitter();

  public icon: string;
  public label: string;

  private _menu = inject(FsMenuComponent);
    
  public ngOnChanges(changes: SimpleChanges): void {
    if(changes.row) {
      this.icon = this.rowAction.getRowIcon(this.row.data);
    }
  }

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

  public ngOnInit(): void {
    this.label = this.rowAction.label;
  }
}
