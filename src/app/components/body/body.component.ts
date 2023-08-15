import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';


import { Column } from '../../models/column.model';
import { ReorderPosition, ReorderStrategy } from '../../classes/reorder-controller';
import { SelectionController } from '../../classes/selection-controller';
import { Row } from '../../models/row';

import { FsRowComponent } from './row/row.component';


@Component({
  selector: '[fs-list-body]',
  templateUrl: 'body.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsBodyComponent {
  @Input() rows: Row[];
  @Input() columns: Column[] = [];
  @Input() hasFooter = false;
  @Input() rowActionsRaw: any[] = [];
  @Input() groupActionsRaw: any[] = [];
  @Input() rowEvents = {};
  @Input() rowClass;
  @Input() hasRowActions = false;
  @Input() selection: SelectionController;
  @Input() restoreMode = false;
  @Input() rowRemoved: EventEmitter<any>;
  @Input() activeFiltersCount: number;
  @Input() reorderEnabled: boolean;
  @Input() reorderPosition: ReorderPosition | null;
  @Input() reorderStrategy: ReorderStrategy | null;
  @Input() reorderMultiple: boolean;

  @ViewChild('rowsContainer', { read: ViewContainerRef, static: true }) rowsContainer;
  @ContentChild(FsRowComponent, { read: TemplateRef, static: true })
  headerTemplate: TemplateRef<any>;

  constructor() {}

  // /**
  //  * Track By for improve change detection
  //  * @param index
  //  * @param item
  //  */
  // public trackByFn(index, item) {
  //   // TODO improve with track by id
  //   return index;
  // }
}
