import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef, OnDestroy,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Sorting } from '../../models/sorting.model';
import { Column } from '../../models/column.model';
import { ReorderPosition, ReorderStrategy } from '../../models/reorder.model';
import { Selection, SelectionChangeType } from '../../models/selection.model';


@Component({
  selector: '[fs-list-head]',
  templateUrl: 'head.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsHeadComponent implements OnInit, OnDestroy {
  @Input() sorting: Sorting;
  @Input() columns: Column[];
  @Input() hasRowActions: boolean;
  @Input() reorderEnabled: boolean;
  @Input() reorderPosition: ReorderPosition;
  @Input() reorderStrategy: ReorderStrategy;
  @Input() selection: Selection;

  @ViewChild('rowsContainer', { read: ViewContainerRef }) rowsContainer;

  public selectedAll = false;
  public readonly ReorderPosition = ReorderPosition;
  public readonly ReorderStrategy = ReorderStrategy;

  private _destroy$ = new Subject();

  constructor(private cdRef: ChangeDetectorRef) {}

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
    this.sorting.sortingChanged
      .subscribe(() => {
      this.cdRef.markForCheck();
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
            ({type}) => type === SelectionChangeType.rowSelected
          ),
        )
        .subscribe(({type, payload: status}) => {
          this.selectedAll = status;

          this.cdRef.markForCheck();
        });
    }
  }
}
