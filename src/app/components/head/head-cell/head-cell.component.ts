import { Component } from '@angular/core';
import { FsCellComponent } from '../../body/row/cell/cell.component';

@Component({
  selector: 'fs-head-cell',
  templateUrl: 'head-cell.component.html'
})
export class FsHeadCellComponent extends FsCellComponent {

  public cellContext: any = {};

  constructor() {
    super();
  }

  public initCellContext() {
    this.cellContext.value = this.column.title;
  }
}
