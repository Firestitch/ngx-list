import { Directive } from '@angular/core';

import { FsListCellDirective } from '../cell/cell.directive';


@Directive({
    selector: '[fs-list-group-cell],[fs-list-group-header]',
    standalone: true,
})
export class FsListGroupHeaderDirective extends FsListCellDirective {}
