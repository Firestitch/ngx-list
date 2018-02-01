import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { FsListRowTemplateDirective } from '../';
import { FsListHeaderTemplateDirective } from '../header-template/header-template.directive';
import { CellOptions } from '../../interfaces';

@Directive({
  selector: 'fs-list-column'
})
export class FsListColumnDirective {
  @Input() public title: string;
  @Input() public name: string;
  @Input() public sortable: boolean;

  @ContentChild(FsListHeaderTemplateDirective, { read: TemplateRef })
  headerTemplate: TemplateRef<any>;

  @ContentChild(FsListHeaderTemplateDirective) headerOptions: CellOptions;

  @ContentChild(FsListRowTemplateDirective, { read: TemplateRef })
  rowTemplate: TemplateRef<any>;

  @ContentChild(FsListRowTemplateDirective) cellOptions: CellOptions;
}
