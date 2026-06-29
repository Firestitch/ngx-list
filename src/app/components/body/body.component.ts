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

import { ReorderPosition, ReorderStrategy } from '../../classes/reorder-controller';
import { SelectionController } from '../../classes/selection-controller';
import { FsListDraggableRowDirective } from '../../directives/draggable-row/draggable-row.directive';
import { Column } from '../../models/column.model';
import { Row } from '../../models/row';

import { FsRowComponent } from './row/row.component';


@Component({
  selector: '[fs-list-body]',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsRowComponent,
    FsListDraggableRowDirective,
  ],
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

  /**
   * Track rows by their underlying record id so that a reload (which creates
   * fresh Row wrapper objects) reuses the existing DOM instead of destroying
   * and recreating every row. Falls back to the row index when the data has
   * no id (e.g. group/footer rows or id-less records) -> avoids NG0956.
   */
  public trackByFn(index: number, row: Row): unknown {
    const id = (row?.data as { id?: unknown })?.id;

    return id ?? index;
  }

}
