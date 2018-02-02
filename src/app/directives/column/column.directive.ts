import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { FsListCellDirective, FsListHeaderDirective } from '../';
import { CellOptions } from '../../interfaces';

@Directive({
  selector: 'fs-list-column'
})
export class FsListColumnDirective {
  @Input() public title: string;
  @Input() public name: string;
  @Input() public sortable: boolean;
  @Input() public align: string;
  @Input('class') public styleClass: string | string[];

  @ContentChild(FsListHeaderDirective, { read: TemplateRef })
  headerTemplate: TemplateRef<any>;

  @ContentChild(FsListHeaderDirective) headerConfigs: CellOptions;

  @ContentChild(FsListCellDirective, { read: TemplateRef })
  rowTemplate: TemplateRef<any>;

  @ContentChild(FsListCellDirective) cellConfigs: CellOptions;
}
