import {
  AfterContentInit,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { Column } from '../../models/column.model';

@Component({
  selector: 'fs-list-row',
  templateUrl: 'row.component.html',
})
export class FsRowComponent {
  @HostBinding('class.fs-list-row') t = true;
  @HostBinding('attr.role') role = 'row';

  @Input() row: any;
  @Input() rowIndex: number;
  @Input() columns: Column[];
  // @Input() listModel: FsList;

  // @ViewChildren(FsCellComponent) cells: QueryList<any>;

  constructor() {
    // this.cells.forEach((cell, index) => {
    //   console.log(cell);
    //   cell.colIndex = index;
    // })
  }

  // public ngAfterContentInit() {
  //   if (this.cells) {
  //     this.cells.forEach((cell, index) => {
  //       // console.log(cell);
  //       cell.colIndex = index;
  //       cell.listModel = this.listModel;
  //     })
  //   }
  // }
}
