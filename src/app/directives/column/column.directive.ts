import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';

// Directives
import { FsListHeaderDirective } from '../header/header.directive';
import { FsListCellDirective } from '../cell/row.directive';
import { FsListFooterDirective } from '../footer/footer.directive';

import { CellConfig } from '../../interfaces';


@Directive({
  selector: 'fs-list-column'
})
export class FsListColumnDirective {
  @Input() public title: string;
  @Input() public name: string;
  @Input() public show = true;
  @Input() public sortable: boolean;
  @Input() public align: string;
  @Input() public width: string;
  @Input('class') public className: string | string[];

  @ContentChild(FsListHeaderDirective, { read: TemplateRef, static: false })
  headerTemplate: TemplateRef<any>;

  @ContentChild(FsListHeaderDirective, { static: false }) headerConfigs: CellConfig;

  @ContentChild(FsListCellDirective, { read: TemplateRef, static: false })
  rowTemplate: TemplateRef<any>;

  @ContentChild(FsListCellDirective, { static: false }) cellConfigs: CellConfig;

  @ContentChild(FsListFooterDirective, { read: TemplateRef, static: false })
  footerTemplate: TemplateRef<any>;

  @ContentChild(FsListFooterDirective, { static: false }) footerConfigs: CellConfig;
}
