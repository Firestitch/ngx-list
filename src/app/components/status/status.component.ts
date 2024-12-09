import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaginationController } from '../../classes/pagination-controller';
import { SortingController } from '../../classes/sorting-controller';
import { PaginationStrategy } from '../../enums';
import { SortingDirection } from '../../models/column.model';


@Component({
  selector: 'fs-list-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true,
})
export class FsStatusComponent implements OnInit, OnDestroy {

  @Input() public paging: PaginationController;
  @Input() public sorting: SortingController;
  @Input() public rows;

  @Input()
  @HostBinding('class.first-load')
  @HostBinding('class.fs-skeleton-placeholder')
  public firstLoad: boolean;
  
  public PaginationStrategy = PaginationStrategy;
  
  private _destroy$ = new Subject<void>();

  constructor(private _cdRef: ChangeDetectorRef) {
  }

  public ngOnInit() {
    this.sorting.sortingChanged$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._cdRef.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
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
    if (this.sorting.sortingColumn !== column) {
      this.sorting.sortBy(column);
    }
  }

  public setLimit(limit) {
    this.paging.setLimit(limit);
  }
}
