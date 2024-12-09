import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { List } from '../../classes/list-controller';
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

  @Input() public list: List;
  @Input() public rows;

  @Input()
  @HostBinding('class.first-load')
  @HostBinding('class.fs-skeleton-placeholder')
  public firstLoad: boolean;
  
  public PaginationStrategy = PaginationStrategy;
  public manyLabel = 'many';
  public paging: PaginationController;
  public sorting: SortingController;

  private _destroy$ = new Subject<void>();
  private _cdRef = inject(ChangeDetectorRef);

  public ngOnInit() {
    this.paging = this.list.paging;
    this.sorting = this.list.sorting;
    this.sorting.sortingChanged$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._cdRef.markForCheck();
      });

    this.list.filtersQuery$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.manyLabel = 'many';
      });
  }

  public manyClick() {
    this.list.fetchRemote({
      ...this.list.filtersQuery,
      offset: 0,
      limit: 0,
      recordCount: true,
    })
      .subscribe((response) => {
        this.manyLabel = response.paging?.records || 0;
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
