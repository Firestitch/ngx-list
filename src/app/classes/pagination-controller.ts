import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { isObject } from 'lodash-es';

import {
  FsListLoadMoreConfig,
  FsPaging,
  PageChange,
  QueryOffsetStrategy,
  QueryPageStrategy,
} from '../interfaces';
import { PaginationStrategy } from '../enums/pagination-strategy.enum';
import { PageChangeType } from '../enums/page-change-type.enum';

export class PaginationController {

  public limit = 25;
  public records: number;
  public manual = false;

  public page = 1; // Active page
  public offset = 0;

  // public pagesArray = [];
  public displayed = 0;

  private _pages$ = new BehaviorSubject<number>(0); // Total pages

  private _strategy: PaginationStrategy = PaginationStrategy.None;
  private _removedRows = 0;

  private _pageChanged$ = new Subject<PageChange>();
  private _pageReset$ = new Subject<void>();
  private _onDestroy$ = new Subject();

  private _loadMoreEnabled = false;
  private _infinityScrollEnabled = false;
  private _loadMoreText = 'Load More';
  private _limits = [10, 25, 50, 100, 200];

  constructor() {}

  // Total pages
  set pages(value: number) {
    this._pages$.next(value);
  }

  get pages(): number {
    return this._pages$.getValue();
  }

  get pages$(): Observable<number> {
    return this._pages$
      .pipe(
        distinctUntilChanged(),
      );
  }

  /**
   * Fire if page was changed
   */
  get pageChanged$(): Observable<PageChange> {
    return this._pageChanged$.pipe(takeUntil(this._onDestroy$));
  }

  get pageReset$(): Observable<void> {
    return this._pageReset$.asObservable();
  }

  /**
   * Get enabled
   */
  get enabled(): boolean {
    return !this.hasNoneStrategy;
  }

  /**
   * Get Limits
   */
  get limits(): number[] {
    return this._limits;
  }

  /**
   * Set limits, update pages array and set new limit per page
   * @param value
   */
  set limits(value) {
    this._limits = value;

    if (this.limits.length > 0 && this.limits.indexOf(this.limit) === -1) {
      this.limit = this.limits[0]
    } else if (this.limits.length === 0) {
      this.limit = this.records;
    }
  }

  /**
   * Get query for request
   */
  get query() {
    switch (this.strategy) {
      case PaginationStrategy.Page:
        return this.queryPageStrategy;
      case PaginationStrategy.Offset:
        return this.queryOffsetStrategy;
    }

    return {};
  }

  get loadMoreQuery() {
    switch (this.strategy) {
      case PaginationStrategy.Page:
        return this.query;
      case PaginationStrategy.Offset:
        const query = this.queryOffsetStrategy;

        query.limit = query.offset + query.limit;
        query.offset = 0;

        return query;
    }

    return {};
  }

  /**
   * Query for Page Strategy
   */
  get queryPageStrategy(): QueryPageStrategy {
    return this.hasNoneStrategy
      ? {}
      : {
        page: this.page || 1,
        limit: this.limit || 10,
      };
  }

  /**
   * Query for Offset Strategy
   */
  get queryOffsetStrategy(): QueryOffsetStrategy {
    const page = this.page - 1 || 0;
    const limit = this.limit || 5;

    return {
      offset: page * limit,
      limit: limit,
    }
  }

  /**
   * Get query for load only count of deleted rows
   */
  get loadDeletedOffsetQuery() {
    const paginationOffset = this.limit * this.page;
    const actualOffset = Math.min(this.records, paginationOffset);
    const offset = Math.max(0, actualOffset - this._removedRows);

    return {
      offset,
      limit: this._removedRows
    }
  }

  get initialized() {
    return !!this.pages;
  }

  get strategy() {
    return this._strategy;
  }

  set strategy(strategy: PaginationStrategy) {
    this._strategy = (strategy === void 0) ? PaginationStrategy.Page : strategy;
  }

  /**
   * Check if pagination in Page Strategy Mode
   */
  get hasPageStrategy() {
    return this.strategy === PaginationStrategy.Page;
  }

  /**
   * Check if pagination in Offset Strategy Mode
   */
  get hasOffsetStrategy() {
    return this.strategy === PaginationStrategy.Offset;
  }

  /**
   * Check if pagination in None Strategy Mode
   */
  get hasNoneStrategy(): boolean {
    return this.strategy === PaginationStrategy.None;
  }

  /**
   * If prev page can be activated
   *
   */
  get hasPrevPage(): boolean {
    switch (this.strategy) {
      case PaginationStrategy.Page:
        return this._hasPrevPagePageStrategy;
      case PaginationStrategy.Offset:
        return this._hasPrevPageOffsetStrategy;
    }

    return false;
  }

  /**
   * If next page can be activated
   */
  get hasNextPage(): boolean { // Need to check if pages === page && page === 1
    switch (this.strategy) {
      case PaginationStrategy.Page:
        return this._hasNextPagePageStrategy;
      case PaginationStrategy.Offset:
        return this._hasNextPageOffsetStrategy;
    }

    return false;
  }

  get loadMoreEnabled(): boolean {
    return this._loadMoreEnabled;
  }

  get loadMoreText(): string {
    return this._loadMoreText;
  }

  get infinityScrollEnabled() {
    return this._infinityScrollEnabled;
  }

  /**
   * SP-T1974
   * Showing 26-50 of 333 results sorted by Name, Ascending
   * Showing 0 results sorted by Name, Ascending
   */
  get statusLabel(): string {
    const current = (this.page - 1) * this.limit;
    const from = current + 1;
    const to = Math.min(this.records, current + this.limit);

    return `${from}-${to}`;
  }

  public initWithConfig(
    config: FsPaging | false,
    loadMore: FsListLoadMoreConfig | boolean,
    infinityScrollEnabled = false,
  ) {

    if (config) {
      if (config.limits) {
        this.limits = config.limits;
      }

      if (config.limit) {
        this.limit = config.limit;
      }

      this.strategy = config.strategy;
    }

    if (loadMore) {
      this.setLoadMore(loadMore);
    }

    this._infinityScrollEnabled = infinityScrollEnabled;
  }

  /**
   * If pagination has prev page when Page Strategy
   */
  private get _hasPrevPagePageStrategy(): boolean {
    return this.page > 1 && this.pages > 1;
  }

  /**
   * If pagination has prev page when Offset Strategy
   */
  private get _hasPrevPageOffsetStrategy(): boolean {
    return this.offset >= this.limit && this.records > 1;
  }

  /**
   * If pagination has next page when Page Strategy
   */
  private get _hasNextPagePageStrategy(): boolean {
    return this.page < this.pages && this.pages > 1;
  }

  /**
   * If pagination has next page when Offset Strategy
   */
  private get _hasNextPageOffsetStrategy(): boolean {
    return (this.offset + this.limit) < this.records && this.records > 1;
  }

  /**
   * Update paging config and all related fields
   * @param config
   * @param displayedRecords
   * @param loadMoreOperation
   */
  public updatePaging(config, displayedRecords = 0, loadMoreOperation = false) {
    if (!loadMoreOperation) {
      this._fromParams(config);
      this.displayed = displayedRecords;
    } else {
      this.records = config.records;

      if (this.records < this.displayed) {
        this.displayed = this.records;
      }

      this._removedRows = 0;
    }

    this.updateTotalPages();
  }

  // /**
  //  * Update paging when data source not remove
  //  * @param {any[]} rows
  //  */
  /*public updatePagingManual(rows: any[]) {
    if (Array.isArray(rows) && rows.length > 0) {
      this.records = rows.length;
      this.pages = Math.ceil(rows.length / this.limit);
    }

    this.updatePagesArray();
    this.updateDisplayed();
  }*/

  /**
   * Update pages array with new pages count
   */
  // public updatePagesArray() {
  //   const MIDDLE = 2;
  //   const pagesArr = [];

  //   let from = 0;
  //   let to = 0;
  //   if (this.page < MIDDLE) {
  //     from = MIDDLE - 1;
  //     to = MIDDLE + 1;
  //   } else if (this.page >= MIDDLE && this.page <= this.pages - MIDDLE + 1) {
  //     from = this.page - 1;
  //     to = this.page + 1;
  //   } else if (this.page > this.pages - MIDDLE + 1) {
  //     from = this.pages - MIDDLE - 1;
  //     to = this.pages;
  //   }

  //   if (!this.pages || this.pages < 5) {
  //     from = 1;
  //     to = this.pages || 0;
  //   }

  //   for (let i = from; i <= to; i++) {
  //     pagesArr.push(i);
  //   }

  //   this.pagesArray = Object.assign([], pagesArr);
  // }

  public setLoadMore(config: FsListLoadMoreConfig | boolean) {
    this._loadMoreEnabled = !!config;

    if (this._loadMoreEnabled && isObject(config) && (config as FsListLoadMoreConfig).label) {
      this._loadMoreText = (config as FsListLoadMoreConfig).label;
    }
  }

  /**
   * Update dispayed records counter
   */
  // public updateDisplayed() {
  //   this.displayed = this.getVisibleRecords();
  // }

  /**
   * Return count of records that could be shown on page
   */
  // public getVisibleRecords() {
  //   const diff = this.hasOffsetStrategy
  //     ? this.records - this.offset
  //     : this.limit;
  //
  //   return diff < this.limit
  //     ? diff
  //     : this.displayed;
  // }

  public getVisibleRecords() {
    return this.displayed;
  }

  /**
   * Set new limit
   * @param limit
   */
  public setLimit(limit) {
    this.limit = limit;
    this.resetPaging();

    this._pageChanged$.next({
      type: PageChangeType.LimitChanged,
      payload: limit
    });
  }

  /**
   * If page is activate page
   * @param page
   */
  public isActive(page): boolean {
    return page === this.page;
  }

  /**
   * Go to page
   * @param page
   */
  public goToPage(page) {
    if (page >= 1 && this.page !== page) {
      this.page = page;

      this.updateOffset();

      this._pageChanged$.next({
        type: PageChangeType.Default,
        payload: page
      });
    }
  }

  /**
   * Reset paging like it was just initialized
   */
  public resetPaging() {
    this.page = 1;
    this.offset = 0;
  }

  /**
   * Go to next page
   */
  public goNext() {
    if (this.hasNextPage) {
      this.page++;

      this.updateOffset();

      this._pageChanged$.next({
        type: PageChangeType.Default,
        payload: this.page,
      });
    }
  }

  /**
   * Go to first page
   */
  public goFirst() {
    if (this.page > 1) {
      this.page = 1;

      this.updateOffset();

      this._pageChanged$.next({
        type: PageChangeType.Default,
        payload: this.page,
      });
    }
  }

  /**
   * Go to prev page
   */
  public goPrev() {
    if (this.page > 1) {
      this.page--;

      this.updateOffset();

      this._pageChanged$.next({
        type: PageChangeType.Default,
        payload: this.page,
      });
    }
  }

  /**
   * Go to last page
   */
  public goLast() {
    if (this.page < this.pages) {
      this.page = this.pages;

      this.updateOffset();

      this._pageChanged$.next({
        type: PageChangeType.Default,
        payload: this.page
      });
    }
  }

  /**
   * Update count of deleted rows. This count will be applied for offset calc
   * @param count
   */
  public removeRows(count: number) {
    this._removedRows += count;
  }

  public updatePagination() {
    this.updateTotalPages();
  }

  /**
   * Destroy
   */
  public destroy() {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  /**
   * Update paging state
   * @param params
   */
  private _fromParams(params): void {
    if (!this.loadMoreEnabled) {
      this.limit = params.limit ?? 25;
    }

    this.records = params.records;
    this.manual = params.manual;

    this.pages = params.pages || 0
  }

  /**
   * Calc and update offset
   */
  private updateOffset() {
    this.offset = this.limit * (this.page - 1);
  }

  /**
   * Calc and update total count of pages
   */
  private updateTotalPages() {
    this.pages = Math.ceil(this.records / this.limit);
  }
}
