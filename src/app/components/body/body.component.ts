import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { ReorderPosition, ReorderStrategy } from '../../classes/reorder-controller';
import { SelectionController } from '../../classes/selection-controller';
import { Column } from '../../models/column.model';
import { Row } from '../../models/row';

import { FsRowComponent } from './row/row.component';


@Component({
  selector: '[fs-list-body]',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsBodyComponent {

  @Input() public rows: Row[];
  @Input() public columns: Column[] = [];
  @Input() public hasFooter = false;
  @Input() public rowActionsRaw: any[] = [];
  @Input() public groupActionsRaw: any[] = [];
  @Input() public rowEvents = {};
  @Input() public rowClass;
  @Input() public hasRowActions = false;
  @Input() public selection: SelectionController;
  @Input() public restoreMode = false;
  @Input() public rowRemoved: EventEmitter<any>;
  @Input() public activeFiltersCount: number;
  @Input() public reorderEnabled: boolean;
  @Input() public reorderPosition: ReorderPosition | null;
  @Input() public reorderStrategy: ReorderStrategy | null;
  @Input() public reorderMultiple: boolean;

  @ViewChild('rowsContainer', { read: ViewContainerRef, static: true })
  public rowsContainer;

  @ContentChild(FsRowComponent, { read: TemplateRef, static: true })
  public headerTemplate: TemplateRef<any>;

}
