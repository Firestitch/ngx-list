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
import { Row, isGroupFooterRow, isGroupRow } from '../../models/row';

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
  @Input() public selection: SelectionController | null;
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
   * and recreating every row. A reused DOM row keeps the cell templates and
   * actions it was first built with, so only a row that renders the same way
   * may take it over:
   * - Group headers and group footers are tracked by their wrapper, never by
   *   id. Their data can be a child's own record (a groupBy that returns the
   *   row), so the id would collide with that child's, and they render with
   *   different templates and actions than a record row.
   * - A record row without a genuine, non-empty id (empty string / null /
   *   undefined) is tracked by its wrapper too. Tracking it by its position
   *   handed each DOM row to whatever row landed there after the reload, so a
   *   group header drew a record's cells and a record drew a group header.
   */
  public trackByFn(row: Row): unknown {
    if (isGroupRow(row) || isGroupFooterRow(row)) {
      return row;
    }

    const id = (row?.data as { id?: unknown })?.id;

    return id === undefined || id === null || id === ''
      ? row
      : id;
  }

}
