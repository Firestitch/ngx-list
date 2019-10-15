import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Column } from '../../../../models/column.model';

@Component({
  selector: '[fs-cell]',
  templateUrl: 'cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsCellComponent implements OnInit {
  @HostBinding('class.fs-list-col') isColl = true;

  @HostBinding('attr.role') role = 'gridcell';

  @Input() public column: Column;
  @Input() public row;
  @Input() public rowIndex: number;

  public cellContext: any = {};

  constructor() {
  }

  public ngOnInit() {
    this.initCellContext();
  }

  public initCellContext() {
    this.cellContext.index = this.rowIndex;
    this.cellContext.column = this.column;
    if (this.row) {
      this.cellContext.row = this.row.data;
      this.cellContext.value = this.row.data[this.column.name];
    }
  }
}
