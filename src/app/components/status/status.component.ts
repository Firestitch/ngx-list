import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IPaging } from '../../interfaces';

@Component({
  selector: 'fs-list-status',
  templateUrl: 'status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsStatusComponent implements OnInit {
  @Input() public paging: IPaging;

  constructor() {}

  get displayedRecords() {
    return (this.paging.limit < this.paging.records) ? this.paging.limit : this.paging.records;
  }

  get total() {
    return this.paging.records;
  }

  public ngOnInit() {
  }
}
