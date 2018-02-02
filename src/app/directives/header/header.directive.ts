import { Directive, Input } from '@angular/core';

@Directive({ selector: '[fs-list-header]' })
export class FsListHeaderDirective {
  @Input() public colspan;
  @Input() public align: string;
  @Input('class') public styleClass: string | string[];

}
