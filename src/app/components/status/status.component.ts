import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SortingDirection } from '../../models/column.model';
import { Pagination } from '../../models/pagination.model';
import { Sorting } from '../../models/sorting.model';

@Component({
  selector: 'fs-list-status',
  templateUrl: 'status.component.html',
  styleUrls: [
    './status.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsStatusComponent implements OnInit {
  @Input() public paging: Pagination;
  @Input() public sorting: Sorting;
  @Input() public dataChangedRef;

  public OrderDirection = SortingDirection;
  constructor(private cdRef: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.dataChangedRef.subscribe(() => {
      this.cdRef.markForCheck();
    })
  }

  public setDirection(direction: SortingDirection) {
    this.sorting.setSortDirection(direction);
  }

  public setSortableColumn(column) {
    this.sorting.sortBy(column, false);
  }

  public setLimit(limit) {
    this.paging.setLimit(limit);
  }
}
