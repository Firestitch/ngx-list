
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

  public limit = 25;
  public records: number;
  public manual = false;
  public page = 1; // Active page
  public offset = 0;
  public displayed = 0;

  private _pages$ = new BehaviorSubject<number>(0); // Total pages
  private _strategy: PaginationStrategy = PaginationStrategy.None;
  private _removedRows = 0;
  private _pageChanged$ = new Subject<PageChange>();
  private _pageReset$ = new Subject<void>();
  private _onDestroy$ = new Subject();

  private _loadMoreConfig: FsListLoadMoreConfig;
  private _limits = [10, 25, 50, 100, 200];

  // Total pages
  public set pages(value: number) {
    this._pages$.next(value);
  }

  public get pages(): number {
    return this._pages$.getValue();
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

    if (this.limits.length > 0 && this.limits.indexOf(this.limit) === -1) {
      this.limit = this.limits[0];
    } else if (this.limits.length === 0) {
      this.limit = this.records;
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
        page: this.page || 1,
        limit: this.limit || 10,
        records: true,
      };
  }

  /**
   * Query for Offset Strategy
   */
  public get queryOffsetStrategy(): QueryOffsetStrategy {
    const page = this.page - 1 || 0;
    const limit = this.limit || 5;

    return {
      offset: page * limit,
      limit,
      records: true,
    };
  }

  public get queryManyStrategy(): QueryManyStrategy {
    return {
      ...this.queryOffsetStrategy,
      records: false,
    };
  }

  /**
   * Get query for load only count of deleted rows
   */
  public get loadDeletedOffsetQuery() {
    const paginationOffset = this.limit * this.page;
    const actualOffset = Math.min(this.records, paginationOffset);
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
        return true;
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
    const current = (this.page - 1) * this.limit;
    const from = current + 1;
    const to = this.hasManyStrategy ?
      current + this.limit : 
      Math.min(this.records, current + this.limit);

    return `${from}-${to}`;
  }

  public get state(): IPaginationState {
    return {
      enabled: this.enabled,
      strategy: this.strategy,
      page: this.page,
      offset: this.offset,
      limit: this.limit,
      records: this.records,
      displayed: this.displayed,
    };
  }

  public initWithConfig(
    config: FsPaging | false,
    loadMore: FsListLoadMoreConfig | boolean,
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
    
    this.setLoadMore(loadMore);
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
   * If pagination has prev page when Offset Strategy
   */
  private get _hasPrevPageManyStrategy(): boolean {
    return this.offset >= this.limit;
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
   *
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

    this._updateTotalPages();
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
   *
   * @param limit
   */
  public setLimit(limit) {
    this.limit = limit;
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
    return page === this.page;
  }

  /**
   * Go to page
   *
   * @param page
   */
  public goToPage(page) {
    if (page >= 1 && this.page !== page) {
      this.page = page;

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
    this.page = 1;
    this.offset = 0;
  }

  /**
   * Go to next page
   */
  public goNext() {
    if (this.hasNextPage) {
      this.page++;

      this._updateOffset();

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

      this._updateOffset();

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

      this._updateOffset();

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
    if (this.page !== this.pages) {
      this.page = this.pages;

      this._updateOffset();

      this._pageChanged$.next({
        type: PageChangeType.Default,
        payload: this.page,
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
      this.limit = params.limit ?? 25;
    }

    this.records = params.records;
    this.manual = params.manual;

    this.pages = params.pages || 0;
  }

  /**
   * Calc and update offset
   */
  private _updateOffset() {
    this.offset = this.limit * (this.page - 1);
  }

  /**
   * Calc and update total count of pages
   */
  private _updateTotalPages() {
    this.pages = Math.ceil(this.records / this.limit);
  }
}
