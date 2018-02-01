import { Directive, Input } from '@angular/core';

@Directive({ selector: '[fs-list-header-template]' })
export class FsListHeaderTemplateDirective {
  @Input() public colspan;
  @Input() public align: string;
  @Input('class') public styleClass: string | string[];

}
