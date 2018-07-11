import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { FsListCellDirective, FsListHeaderDirective } from '../';
import { CellConfig } from '../../interfaces';
import { FsListFooterDirective } from '../footer';

@Directive({
  selector: 'fs-list-column'
})
export class FsListColumnDirective {
  @Input() public title: string;
  @Input() public name: string;
  @Input() public sortable: boolean;
  @Input() public align: string;
  @Input() public width: string;
  @Input('class') public className: string | string[];

  @ContentChild(FsListHeaderDirective, { read: TemplateRef })
  headerTemplate: TemplateRef<any>;

  @ContentChild(FsListHeaderDirective) headerConfigs: CellConfig;

  @ContentChild(FsListCellDirective, { read: TemplateRef })
  rowTemplate: TemplateRef<any>;

  @ContentChild(FsListCellDirective) cellConfigs: CellConfig;

  @ContentChild(FsListFooterDirective, { read: TemplateRef })
  footerTemplate: TemplateRef<any>;

  @ContentChild(FsListFooterDirective) footerConfigs: CellConfig;
}
