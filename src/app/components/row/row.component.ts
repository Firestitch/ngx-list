import {
  AfterContentInit,
  Component, HostBinding, Input, QueryList, ViewChildren,
} from '@angular/core';
import { FsCellComponent } from '../cell/cell.component';
import { FsList } from '../../models';

@Component({
  selector: 'fs-row',
  templateUrl: 'row.component.html',
})
export class FsRowComponent implements AfterContentInit {
  @HostBinding('class.fs-list-row') t = true;
  @HostBinding('attr.role') role = 'row';

  @Input() row: any;
  @Input() rowIndex: number;
  @Input() listModel: FsList;

  @ViewChildren(FsCellComponent) cells: QueryList<any>;

  constructor() {
    // this.cells.forEach((cell, index) => {
    //   console.log(cell);
    //   cell.colIndex = index;
    // })
  }

  public ngAfterContentInit() {
    if (this.cells) {
      this.cells.forEach((cell, index) => {
        // console.log(cell);
        cell.colIndex = index;
        cell.listModel = this.listModel;
      })
    }
  }
}
