import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { BehaviorSubject, filter, Observable, Subject, takeUntil, tap } from 'rxjs';

import { PaginationController } from '../../classes/pagination-controller';

@Component({
  selector: 'fs-list-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsPaginationComponent implements OnInit, OnDestroy {

  @Input() public pagination: PaginationController;
  @Input() public rows;
  @Input() public loading$: Observable<boolean>;

  private _destroy$ = new Subject<void>();
  private _paging$ = new BehaviorSubject<boolean>(false);

  public ngOnInit(): void {
    this.loading$
      .pipe(
        filter((loading) => !loading),
        tap(() => this._paging$.next(false)),
        takeUntil(this._destroy$),
      )
      .subscribe();
  }

  public get paging$(): Observable<boolean> {
    return this._paging$.asObservable();
  }

  public first() {
    this._paging$.next(true);
    this.pagination.goFirst();
  }

  public prev() {
    this._paging$.next(true);
    this.pagination.goPrev();
  }

  public next() {
    this._paging$.next(true);
    this.pagination.goNext();
  }

  public last() {
    this._paging$.next(true);
    this.pagination.goLast();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
