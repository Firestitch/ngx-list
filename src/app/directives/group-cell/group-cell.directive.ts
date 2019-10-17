import { Directive } from '@angular/core';
import { FsListCellDirective } from '../cell/cell.directive';



@Directive({
  selector: '[fs-list-group-cell]'
})
export class FsListGroupCellDirective extends FsListCellDirective {}
