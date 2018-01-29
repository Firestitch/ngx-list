import { Component, Input } from '@angular/core';
import { FsListConfig } from '../../models/list-config.model';
import { SortingDirection } from '../../models/column.model';
import { Pagination } from '../../models/pagination.model';
import { Sorting } from '../../models/sorting.model';

@Component({
  selector: 'fs-list-status',
  templateUrl: 'status.component.html',
  styleUrls: [
    './status.component.scss',
  ]
})
export class FsStatusComponent {
  @Input() public paging: Pagination;
  @Input() public sorting: Sorting;

  public OrderDirection = SortingDirection;
  constructor() {

  }

  public setDirection(direction: SortingDirection) {
    this.sorting.setSortDirection(direction);
  }

  public setSortableColumn(column) {
    this.sorting.sortBy(column, false);
  }
}
