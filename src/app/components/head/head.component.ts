import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { MatCheckboxChange } from '@angular/material/checkbox';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import {
  ReorderPosition,
  ReorderStrategy,
} from '../../classes/reorder-controller';
import { SelectionChangeType, SelectionController } from '../../classes/selection-controller';
import { SortingController } from '../../classes/sorting-controller';
import { Column } from '../../models/column.model';


@Component({
  selector: '[fs-list-head]',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsHeadComponent implements OnInit, OnDestroy {

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

  constructor(private _cdRef: ChangeDetectorRef) { }

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
    this._destroy$.next();
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
   */
  public trackByFn(index) {
    return index;
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
