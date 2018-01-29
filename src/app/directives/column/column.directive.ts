import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { FsListRowTemplateDirective } from '../';

@Directive({
  selector: 'fs-list-column'
})
export class FsListColumnDirective {
  @Input() public title: string;
  @Input() public name: string;
  @Input() public sortable: boolean;

  @ContentChild(FsListRowTemplateDirective, { read: TemplateRef })
  template: TemplateRef<any>;
}
