import { Directive } from '@angular/core';

import { FsListCellDirective } from '../cell/cell.directive';


@Directive({
  selector: '[fs-list-group-cell],[fs-list-group-header]'
})
export class FsListGroupHeaderDirective extends FsListCellDirective {}
