import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[fs-list-footer]',
    standalone: true
})
export class FsListFooterDirective {
  @Input() public colspan;
  @Input() public align: string;
  @Input('class') public className: string | string[];
}
