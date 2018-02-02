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

  get template() {
    return (this.row) ? this.column.rowTemplate : this.column.footerTemplate;
  }

  public ngOnInit() {
    this.initCellContext();
  }

  public initCellContext() {
    this.cellContext.index = this.rowIndex + 1;
    this.cellContext.column = this.column;
    if (this.row) {
      this.cellContext.row = this.row;
      this.cellContext.value = this.row[this.column.name];
    }
  }
}
