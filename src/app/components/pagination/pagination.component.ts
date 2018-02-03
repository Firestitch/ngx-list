import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pagination } from '../../models/pagination.model';

@Component({
  selector: 'fs-list-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: [
    './pagination.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsPaginationComponent implements OnInit {
  @Input() pagination: Pagination;
  @Input() dataChangedRef: BehaviorSubject<any>;

  constructor(private cdRef: ChangeDetectorRef) {

  }

  public ngOnInit() {
    this.dataChangedRef.subscribe(() => {
      this.cdRef.markForCheck();
    });
  }
}
