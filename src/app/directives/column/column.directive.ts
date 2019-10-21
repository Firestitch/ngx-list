import {
  ContentChild,
  ContentChildren,
  Directive,
  Input,
  QueryList,
  TemplateRef
} from '@angular/core';

// Directives
import { FsListHeaderDirective } from '../header/header.directive';
import { FsListCellDirective } from '../cell/cell.directive';
import { FsListFooterDirective } from '../footer/footer.directive';

import { CellConfig } from '../../interfaces';
import { FsListGroupCellDirective } from '../group-cell/group-cell.directive';
import { FsListGroupExpandTriggerDirective } from '../group-expand-trigger/group-expand-trigger.directive';


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

  // Header
  @ContentChild(FsListHeaderDirective, { read: TemplateRef, static: true })
  public headerTemplate: TemplateRef<any>;

  @ContentChild(FsListHeaderDirective, { static: true })
  public headerConfigs: CellConfig;

  // Group
  @ContentChild(FsListGroupCellDirective, { read: TemplateRef, static: true })
  public groupCellTemplate: TemplateRef<any>;

  @ContentChild(FsListGroupCellDirective, { static: true })
  public groupCellConfigs: CellConfig;

  // Trigger
  @ContentChildren(FsListGroupExpandTriggerDirective, { descendants: true })
  public expandTrigger: QueryList<FsListGroupExpandTriggerDirective>;

  // Cell
  @ContentChild(FsListCellDirective, { read: TemplateRef, static: true })
  public cellTemplate: TemplateRef<any>;

  @ContentChild(FsListCellDirective, { static: true })
  public cellConfigs: CellConfig;

  // Footer
  @ContentChild(FsListFooterDirective, { read: TemplateRef, static: true })
  public footerTemplate: TemplateRef<any>;

  @ContentChild(FsListFooterDirective, { static: true })
  public footerConfigs: CellConfig;
}
