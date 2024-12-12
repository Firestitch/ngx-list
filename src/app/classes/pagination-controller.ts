
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';


import { PageChangeType } from '../enums/page-change-type.enum';
import { PaginationStrategy } from '../enums/pagination-strategy.enum';
import {
  FsListLoadMoreConfig,
  FsPaging,
  IPaginationState,
  PageChange,
  QueryManyStrategy,
  QueryOffsetStrategy,
  QueryPageStrategy,
} from '../interfaces';

export class PaginationController {

  private _limit = 25;
  private _records: number;
  private _page = 1; // Active page
  private _pageRecords = 0;
  private _offset = 0;
  private _pages$ = new BehaviorSubject<number>(0); // Total pages
  private _strategy: PaginationStrategy = PaginationStrategy.None;
  private _removedRows = 0;
  private _pageChanged$ = new Subject<PageChange>();
  private _pageReset$ = new Subject<void>();
  private _onDestroy$ = new Subject();
  private _loadMoreConfig: FsListLoadMoreConfig;
  private _limits = [10, 25, 50, 100, 200];

  public set pages(value: number) {
    this._pages$.next(value);
  }

  public get pages(): number {
    return this._pages$.getValue();
  }

  public get page(): number {
    return this._page;
  }

  public set page(value: number) {
    this._page = value;
  }

  public get pageRecords(): number {
    return this._pageRecords;
  }

  public get offset(): number {
    return this._offset;
  }

  public get limit(): number {
    return this._limit;
  }

  public get records(): number {
    return this._records;
  }

  public set records(value: number) {
    this._records = value;
  }

  public get pages$(): Observable<number> {
    return this._pages$
      .pipe(
        distinctUntilChanged(),
      );
  }

  /**
   * Fire if page was changed
   */
  public get pageChanged$(): Observable<PageChange> {
    return this._pageChanged$.pipe(takeUntil(this._onDestroy$));
  }

  public get pageReset$(): Observable<void> {
    return this._pageReset$.asObservable();
  }

  /**
   * Get enabled
   */
  public get enabled(): boolean {
    return !this.hasNoneStrategy;
  }

  /**
   * Get Limits
   */
  public get limits(): number[] {
    return this._limits;
  }

  /**
   * Set limits, update pages array and set new limit per page
   *
   * @param value
   */
  public set limits(value) {
    this._limits = value;

    if (this._limits.length > 0 && this._limits.indexOf(this._limit) === -1) {
      this._limit = this._limits[0];
    } else if (this._limits.length === 0) {
      this._limit = this._records;
    }
  }

  /**
   * Get query for request
   */
  public get query() {
    switch (this.strategy) {
      case PaginationStrategy.Page:
        return this.queryPageStrategy;
      case PaginationStrategy.Offset:
        return this.queryOffsetStrategy;
      case PaginationStrategy.Many:
        return this.queryManyStrategy;
    }

    return {};
  }

  public get loadMoreQuery() {
    switch (this.strategy) {
      case PaginationStrategy.Page: {
        return this.query;
      }

      case PaginationStrategy.Offset: {
        const query = this.queryOffsetStrategy;

        query.limit = query.offset + query.limit;
        query.offset = 0;

        return query;
      }
    }

    return {};
  }

  /**
   * Query for Page Strategy
   */
  public get queryPageStrategy(): QueryPageStrategy {
    return this.hasNoneStrategy
      ? {}
      : {
        page: this._page || 1,
        limit: this._limit || 10,
        recordCount: true,
      };
  }

  /**
   * Query for Offset Strategy
   */
  public get queryOffsetStrategy(): QueryOffsetStrategy {
    const page = this._page - 1 || 0;
    const limit = this._limit || 5;

    return {
      offset: page * limit,
      limit,
      recordCount: true,
    };
  }

  public get queryManyStrategy(): QueryManyStrategy {
    return {
      ...this.queryOffsetStrategy,
      recordCount: false,
    };
  }

  /**
   * Get query for load only count of deleted rows
   */
  public get loadDeletedOffsetQuery() {
    const paginationOffset = this._limit * this._page;
    const actualOffset = Math.min(this._records, paginationOffset);
    const offset = Math.max(0, actualOffset - this._removedRows);

    return {
      offset,
      limit: this._removedRows,
    };
  }

  public get initialized() {
    return !!this.pages;
  }

  public get strategy() {
    return this._strategy;
  }

  public set strategy(strategy: PaginationStrategy) {
    this._strategy = (strategy === undefined) ? PaginationStrategy.Page : strategy;
  }

  /**
   * Check if pagination in Page Strategy Mode
   */
  public get hasPageStrategy() {
    return this.strategy === PaginationStrategy.Page;
  }

  /**
   * Check if pagination in Offset Strategy Mode
   */
  public get hasOffsetStrategy() {
    return this.strategy === PaginationStrategy.Offset;
  }

  /**
   * Check if pagination in None Strategy Mode
   */
  public get hasNoneStrategy(): boolean {
    return this.strategy === PaginationStrategy.None;
  }

  /**
   * Check if pagination in None Strategy Mode
   */
  public get hasManyStrategy(): boolean {
    return this.strategy === PaginationStrategy.Many;
  }

  /**
   * If prev page can be activated
   *
   */
  public  get hasPrevPage(): boolean {
    switch (this.strategy) {
      case PaginationStrategy.Page:
        return this._hasPrevPagePageStrategy;
      case PaginationStrategy.Offset:
        return this._hasPrevPageOffsetStrategy;
      case PaginationStrategy.Many:
        return this._hasPrevPageManyStrategy;
    }

    return false;
  }

  /**
   * If next page can be activated
   */
  public get hasNextPage(): boolean { // Need to check if pages === page && page === 1
    switch (this.strategy) {
      case PaginationStrategy.Page:
        return this._hasNextPagePageStrategy;
      case PaginationStrategy.Offset:
        return this._hasNextPageOffsetStrategy;
      case PaginationStrategy.Many:
        return !!this._pageRecords && this._limit === this._pageRecords;
    }

    return false;
  }

  public get loadMoreEnabled(): boolean {
    return this._loadMoreConfig.enabled;
  }

  public get loadMoreLabel(): string {
    return this._loadMoreConfig.label;
  }

  public get loadMoreButtonColor(): string {
    return this._loadMoreConfig.buttonColor;
  }

  public get loadMoreButtonClass(): string {
    if( this._loadMoreConfig.buttonType === 'basic' ) {
      return ''; 
    }

    return `mat-${this._loadMoreConfig.buttonType}-button`;
  }

  public get loadMoreButtonType(): string {
    return this._loadMoreConfig.buttonType;
  }

  /**
   * SP-T1974
   * Showing 26-50 of 333 results sorted by Name, Ascending
   * Showing 0 results sorted by Name, Ascending
   */
  public get statusLabel(): string {
    const status = this.hasManyStrategy ?
      this.manyStatus : 
      this.defaultStatus;

    return Object.values(status)
      .filter((value) => !!value)
      .join('-');
  }

  public get manyStatus(): { from: number, to: number } {
    const current = (this._page - 1) * this._limit;
    const from = current + 1;
    
    if(this._pageRecords === 0) {
      return { from: current, to: 0 };
    }

    return this._pageRecords < this._limit ?
      { from, to: current + this._pageRecords } :
      { from, to: current + this._limit };
  }

  public get defaultStatus(): { from: number, to: number } {
    const current = (this._page - 1) * this._limit;
    const from = current + 1;
    const to = Math.min(this._records, current + this._limit);

    return { from, to };
  }

  public get state(): IPaginationState {
    return {
      enabled: this.enabled,
      strategy: this.strategy,
      page: this._page,
      offset: this._offset,
      limit: this._limit,
      records: this._records,
      pageRecords: this._pageRecords,
    };
  }

  public initWithConfig(
    config: FsPaging | false,
    loadMore: FsListLoadMoreConfig | boolean,
  ) {

    if (config) {
      if (config.limits) {
        this._limits = config.limits;
      }

      if (config.limit) {
        this._limit = config.limit;
      }

      this.strategy = config.strategy;
    }
    
    this.setLoadMore(loadMore);
  }

  /**
   * If pagination has prev page when Page Strategy
   */
  private get _hasPrevPagePageStrategy(): boolean {
    return this._page > 1 && this.pages > 1;
  }

  /**
   * If pagination has prev page when Offset Strategy
   */
  private get _hasPrevPageOffsetStrategy(): boolean {
    return this._offset >= this._limit && this._records > 1;
  }

  /**
   * If pagination has prev page when Offset Strategy
   */
  private get _hasPrevPageManyStrategy(): boolean {
    return this._offset > 0;
  }

  /**
   * If pagination has next page when Page Strategy
   */
  private get _hasNextPagePageStrategy(): boolean {
    return this._page < this.pages && this.pages > 1;
  }

  /**
   * If pagination has next page when Offset Strategy
   */
  private get _hasNextPageOffsetStrategy(): boolean {
    return (this._offset + this._limit) < this._records && this._records > 1;
  }

  /**
   * Update paging config and all related fields
   */
  public updatePaging(config, pageRecords: number = 0, loadMoreOperation = false) {
    if (!loadMoreOperation) {
      this._fromParams(config);
      this._pageRecords = pageRecords;
    } else {
      this._records = config.records;

      if (this._records < this._pageRecords) {
        this._pageRecords = this._records;
      }

      this._removedRows = 0;
    }

    this._updateTotalPages();
  }

  // /**
  //  * Update paging when data source not remove
  //  * @param {any[]} rows
  //  */
  /*public updatePagingManual(rows: any[]) {
    if (Array.isArray(rows) && rows.length > 0) {
      this._records = rows.length;
      this.pages = Math.ceil(rows.length / this._limit);
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
  //   if (this._page < MIDDLE) {
  //     from = MIDDLE - 1;
  //     to = MIDDLE + 1;
  //   } else if (this._page >= MIDDLE && this._page <= this.pages - MIDDLE + 1) {
  //     from = this._page - 1;
  //     to = this._page + 1;
  //   } else if (this._page > this.pages - MIDDLE + 1) {
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
    const loadMoreConfig = typeof config === 'boolean' ? 
      {
        enabled: !!config,
      } : 
      (
        config === undefined ? {} : {
          ...config,
          enabled: true,
        }
      );

    this._loadMoreConfig = {
      enabled: false,
      label: 'Load More',
      buttonType: 'basic',
      ...loadMoreConfig,
    };
  }

  public getPageRecords() {
    return this._pageRecords;
  }

  /**
   * Set new limit
   *
   * @param limit
   */
  public setLimit(limit) {
    this._limit = limit;
    this.resetPaging();

    this._pageChanged$
      .next({
        type: PageChangeType.LimitChanged,
        payload: limit,
      });
  }

  /**
   * If page is activate page
   *
   * @param page
   */
  public isActive(page): boolean {
    return page === this._page;
  }

  /**
   * Go to page
   *
   * @param page
   */
  public goToPage(page) {
    if (page >= 1 && this._page !== page) {
      this._page = page;

      this._updateOffset();

      this._pageChanged$.next({
        type: PageChangeType.Default,
        payload: page,
      });
    }
  }

  /**
   * Reset paging like it was just initialized
   */
  public resetPaging() {
    this._page = 1;
    this._offset = 0;
  }

  /**
   * Go to next page
   */
  public goNext() {
    if (this.hasNextPage) {
      this._page++;
      this._updateOffset();

      this._pageChanged$.next({
        type: PageChangeType.Default,
        payload: this._page,
      });
    }
  }

  /**
   * Go to first page
   */
  public goFirst() {
    if (this._page > 1) {
      this._page = 1;
      this._updateOffset();

      this._pageChanged$.next({
        type: PageChangeType.Default,
        payload: this._page,
      });
    }
  }

  /**
   * Go to prev page
   */
  public goPrev() {
    if (this._page > 1) {
      this._page--;

      this._updateOffset();

      this._pageChanged$.next({
        type: PageChangeType.Default,
        payload: this._page,
      });
    }
  }

  /**
   * Go to last page
   */
  public goLast() {
    if (this._page !== this.pages) {
      this._page = this.pages;

      this._updateOffset();

      this._pageChanged$.next({
        type: PageChangeType.Default,
        payload: this._page,
      });
    }
  }

  /**
   * Update count of deleted rows. This count will be applied for offset calc
   *
   * @param count
   */
  public removeRows(count: number) {
    this._removedRows += count;
  }

  public updatePagination() {
    this._updateTotalPages();
  }

  /**
   * Destroy
   */
  public destroy() {
    this._onDestroy$.next(null);
    this._onDestroy$.complete();
  }

  /**
   * Update paging state
   *
   * @param params
   */
  private _fromParams(params): void {
    if (!this.loadMoreEnabled) {
      this._limit = params.limit ?? 25;
    }

    this._records = params.records;
    this.pages = params.pages || 0;
  }

  /**
   * Calc and update offset
   */
  private _updateOffset() {
    this._offset = this._limit * (this._page - 1);
  }

  /**
   * Calc and update total count of pages
   */
  private _updateTotalPages() {
    this.pages = Math.ceil(this._records / this._limit);
  }
}
