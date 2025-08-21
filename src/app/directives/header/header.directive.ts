import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[fs-list-header]',
    standalone: true
})
export class FsListHeaderDirective {
  @Input() public colspan;
  @Input() public align: string;
  @Input('class') public className: string | string[];
}
