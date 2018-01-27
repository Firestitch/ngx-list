import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Pagination } from '../../models/pagination.model';

@Component({
  selector: 'fs-list-status',
  templateUrl: 'status.component.html',
  styleUrls: [
    './status.component.scss',
  ]
})
export class FsStatusComponent implements OnInit {
  @Input() public pagination: Pagination;

  constructor() {}

  get displayedRecords() {
    debugger;
    return (this.pagination.limit < this.pagination.records) ? this.pagination.limit : this.pagination.records;
  }

  get total() {
    return this.pagination.records;
  }

  public ngOnInit() {
    console.log(this.pagination);
  }
}
