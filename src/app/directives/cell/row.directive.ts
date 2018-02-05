import { Directive, Input } from '@angular/core';

@Directive({ selector: '[fs-list-cell]' })
export class FsListCellDirective {
  @Input() public colspan;
  @Input() public align: string;
  @Input('class') public className: string | string[];
}
