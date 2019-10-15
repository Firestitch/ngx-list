import { AfterViewInit, ContentChild, Directive, Input, TemplateRef } from '@angular/core';

// Directives
import { FsListHeaderDirective } from '../header/header.directive';
import { FsListCellDirective } from '../cell/row.directive';
import { FsListFooterDirective } from '../footer/footer.directive';

import { CellConfig } from '../../interfaces';


@Directive({
  selector: 'fs-list-column'
})
export class FsListColumnDirective implements AfterViewInit {
  @Input() public title: string;
  @Input() public name: string;
  @Input() public show = true;
  @Input() public sortable: boolean;
  @Input() public align: string;
  @Input() public width: string;
  @Input('class') public className: string | string[];

  @ContentChild(FsListHeaderDirective, { read: TemplateRef, static: true })
  public headerTemplate: TemplateRef<any>;

  @ContentChild(FsListHeaderDirective, { static: true })
  public headerConfigs: CellConfig;

  @ContentChild(FsListCellDirective, { read: TemplateRef, static: true })
  public rowTemplate: TemplateRef<any>;

  @ContentChild(FsListCellDirective, { static: true })
  public cellConfigs: CellConfig;

  @ContentChild(FsListFooterDirective, { read: TemplateRef, static: true })
  public footerTemplate: TemplateRef<any>;

  @ContentChild(FsListFooterDirective, { static: true })
  public footerConfigs: CellConfig;

  public ngAfterViewInit(): void {
  }
}
