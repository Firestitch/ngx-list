import { Directive, Input } from '@angular/core';

@Directive({ selector: '[fs-list-row-template]' })
export class FsListRowTemplateDirective {
  @Input() public colspan;
  @Input() public align: string;
  @Input('class') public styleClass: string | string[];
}
