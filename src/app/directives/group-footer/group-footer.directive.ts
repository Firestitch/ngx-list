import { Directive } from '@angular/core';

import { FsListCellDirective } from '../cell/cell.directive';


@Directive({
    selector: '[fs-list-group-footer]',
    standalone: true
})
export class FsListGroupFooterDirective extends FsListCellDirective {}
