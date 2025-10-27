import { AsyncPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef, inject } from '@angular/core';

import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import {
  ReorderPosition,
  ReorderStrategy,
} from '../../classes/reorder-controller';
import { SelectionChangeType, SelectionController } from '../../classes/selection-controller';
import { SortingController } from '../../classes/sorting-controller';
import { Column } from '../../models/column.model';

import { FsHeadCellComponent } from './head-cell/head-cell.component';


@Component({
  selector: '[fs-list-head]',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCheckbox,
    FsHeadCellComponent,
    NgClass,
    AsyncPipe
],
})
export class FsHeadComponent implements OnInit, OnDestroy {
  private _cdRef = inject(ChangeDetectorRef);


  @Input() public sorting: SortingController;
  @Input() public columns: Column[];
  @Input() public hasRowActions: boolean;
  @Input() public selection: SelectionController;
  @Input() public activeFiltersCount: number;
  @Input() public reorderEnabled: boolean;
  @Input() public reorderPosition: ReorderPosition | null;
  @Input() public reorderStrategy: ReorderStrategy | null;

  @ViewChild('rowsContainer', { read: ViewContainerRef, static: true })
  public rowsContainer;

  public selectedAll = false;
  public readonly ReorderStrategyEnum = ReorderStrategy;

  private _destroy$ = new Subject();

  public get leftDragDropEnabled(): boolean {
    return this.reorderEnabled
      && this.reorderPosition === ReorderPosition.Left
      && this.activeFiltersCount === 0;
  }

  public get rightDragDropEnabled(): boolean {
    return this.reorderEnabled
      && this.reorderPosition === ReorderPosition.Right
      && this.activeFiltersCount === 0;
  }

  public ngOnInit() {
    this._initSorting();
    this._initSelection();
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  /**
   * Select All Visible Rows
   *
   * @param event
   */
  public selectAll(event: MatCheckboxChange) {
    this.selection.selectAllVisibleRows(event.checked);
  }

  /**
   * Track By for improve change detection
   *
   * @param index
   * @param column
   */
  public trackByFn(index: number, column: Column) {
    return column.name || column.title || index;
  }

  /**
   * Subscribe to sorting change
   */
  private _initSorting() {
    this.sorting.sortingChanged$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._cdRef.detectChanges();
      });
  }

  /**
   * Subscribe to selection change
   */
  private _initSelection() {
    if (this.selection) {
      this.selection.selectionChange$
        .pipe(
          filter(
            ({ type }) => (
              type === SelectionChangeType.AllVisibleSelectionChange
              || type === SelectionChangeType.SelectedAll
              || type === SelectionChangeType.RowSelectionChange
            ),
          ),
          takeUntil(this._destroy$),
        )
        .subscribe(({ type, payload: status }) => {
          this.selectedAll = status;

          this._cdRef.markForCheck();
        });
    }
  }
}
