import { AfterViewInit, ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { FsListRowTemplateDirective } from '../';

@Directive({
  selector: 'fs-list-column'
})
export class FsListColumnDirective implements AfterViewInit {
  @Input() public title: string;
  @Input() public name: string;

  @ContentChild(FsListRowTemplateDirective, { read: TemplateRef })
  template: TemplateRef<any>;

  public ngAfterViewInit() {
    console.log(this.template);
  }
}
