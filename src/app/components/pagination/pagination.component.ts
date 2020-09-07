import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PaginationController } from '../../classes/pagination-controller';

@Component({
  selector: 'fs-list-pagination',
  templateUrl: 'pagination.component.html',
  styleUrls: [
    './pagination.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsPaginationComponent implements OnInit, OnDestroy {

  @Input() pagination: PaginationController;
  @Input() rows;

  private _destroy$ = new Subject();

  constructor(
    private cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    merge(
      this.pagination.pageChanged$,
      this.pagination.pages$,
    )
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.cdRef.markForCheck();
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
