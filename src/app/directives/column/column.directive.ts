import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { FsListRowTemplateDirective } from '../';

@Directive({
  selector: 'fs-list-column'
})
export class FsListColumnDirective {
  @Input() public title: string;
  @Input() public name: string;
  @Input() public sortable: boolean;
  @Input() public headerAlign: string;
  @Input() public headerClass: string | string[];
  @Input() public cellAlign: string;
  @Input() public cellClass: string | string[];

  @ContentChild(FsListRowTemplateDirective, { read: TemplateRef })
  template: TemplateRef<any>;
}
