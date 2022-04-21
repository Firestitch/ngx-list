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
import { ColumnAttributes } from '../../models/column-attributes';


@Directive({
  selector: 'fs-list-column'
})
export class FsListColumnDirective {

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

  private readonly _columnAttributes = new ColumnAttributes();

  constructor() {}

  public get attributes(): ColumnAttributes {
    return this._columnAttributes;
  }

  @Input('show')
  public set visible(value: boolean) {
    this._columnAttributes.visible = value;
  }

  @Input()
  public set title(value: string) {
    this._columnAttributes.title = value;
  }

  @Input()
  public set name(value: string) {
    this._columnAttributes.name = value;
  }

  @Input()
  public set customize(value: boolean) {
    this._columnAttributes.customize = value;
  }

  @Input()
  public set sortable(value: boolean) {
    this._columnAttributes.sortable = value;
  }

  @Input()
  public set sortableDefault(value: boolean) {
    this._columnAttributes.sortableDefault = value;
  }

  @Input()
  public set direction(value: 'asc' | 'desc') {
    this._columnAttributes.direction = value;
  }

  @Input()
  public set align(value: string) {
    this._columnAttributes.align = value;
  }

  @Input()
  public set width(value: string) {
    this._columnAttributes.width = value;
  }

  @Input('class')
  public set className(value: string | string[]) {
    this._columnAttributes.className = value;
  }

}
