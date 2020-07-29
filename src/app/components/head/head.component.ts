import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef, OnDestroy,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { Column } from '../../models/column.model';
import { SortingController } from '../../classes/sorting-controller';
import {
  ReorderController,
  ReorderPosition,
  ReorderStrategy
} from '../../classes/reorder-controller';
import { SelectionController, SelectionChangeType } from '../../classes/selection-controller';


@Component({
  selector: '[fs-list-head]',
  templateUrl: 'head.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsHeadComponent implements OnInit, OnDestroy {
  @Input() sorting: SortingController;
  @Input() columns: Column[];
  @Input() hasRowActions: boolean;
  @Input() selection: SelectionController;

  @ViewChild('rowsContainer', { read: ViewContainerRef, static: true }) rowsContainer;

  public selectedAll = false;
  public readonly ReorderPosition = ReorderPosition;
  public readonly ReorderStrategy = ReorderStrategy;

  private _destroy$ = new Subject();

  constructor(
    public reorderController: ReorderController,
    private cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.initSorting();
    this.initSelection();
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Select All Visible Rows
   * @param event
   */
  public selectAll(event: MatCheckboxChange) {
    this.selection.selectAllVisibleRows(event.checked);
  }

  /**
   * Track By for improve change detection
   * @param index
   */
  public trackByFn(index) {
    return index;
  }

  /**
   * Subscribe to sorting change
   */
  private initSorting() {
    this.sorting.sortingChanged$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.cdRef.detectChanges();
      });
  }

  /**
   * Subscribe to selection change
   */
  private initSelection() {
    if (this.selection) {
      this.selection.selectionChange$
        .pipe(
          filter(
            ({type}) => (
              type === SelectionChangeType.AllVisibleSelectionChange
              || type === SelectionChangeType.SelectedAll
              || type === SelectionChangeType.RowSelectionChange
            )
          ),
          takeUntil(this._destroy$),
        )
        .subscribe(({type, payload: status}) => {
          this.selectedAll = status;

          this.cdRef.markForCheck();
        });
    }
  }
}
