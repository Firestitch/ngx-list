import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import { Subject } from 'rxjs';

import { Pagination } from '../../models/pagination.model';
import { Sorting } from '../../models/sorting.model';
import { SortingDirection } from '../../models/column.model';


@Component({
  selector: 'fs-list-status',
  templateUrl: 'status.component.html',
  styleUrls: [
    './status.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class FsStatusComponent implements OnInit, OnDestroy {
  @Input() public paging: Pagination;
  @Input() public sorting: Sorting;
  @Input() public rows;
  @Input() public scrollable;

  private _destroy$ = new Subject<void>();

  constructor(private cdRef: ChangeDetectorRef) {
  }

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public toggleDirection() {
    if (this.sorting.sortingColumn.direction === 'asc') {
      this.sorting.sortDirection(SortingDirection.desc);
    } else {
      this.sorting.sortDirection(SortingDirection.asc);
    }
  }

  public setSortableColumn(column) {
    this.sorting.sortBy(column);
  }

  public setLimit(limit) {
    this.paging.setLimit(limit);
  }
}
