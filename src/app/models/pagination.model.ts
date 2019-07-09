import { Alias, Model } from 'tsmodels';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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


export class Pagination extends Model {

  @Alias() public limit = 25;
  @Alias() public pages = 0; // Total pages
  @Alias() public records: number;
  @Alias() public manual = false;

  public page = 1; // Active page
  public offset = 0;

  public pagesArray = [];
  public displayed = 0;

  private _strategy: PaginationStrategy = PaginationStrategy.Page;
  private _removedRows = 0;

  private _pageChanged = new Subject<PageChange>();
  private _onDestroy = new Subject();

  private _enabled = true;
  private _loadMoreEnabled = false;
  private _loadMoreText = 'Load More';
  private _limits = [10, 25, 50, 100, 200];

  constructor(config: FsPaging | any = {}) {
    super();

    this.updatePaging(config);
  }

  /**
   * Fire if page was changed
   */
  get pageChanged(): Observable<PageChange> {
    return this._pageChanged.pipe(takeUntil(this._onDestroy));
  }

  /**
   * Get enabled
   */
  get enabled(): boolean {
    return this._enabled;
  }

  /**
   * Set enabled and update pages array
   * @param value
   */
  set enabled(value) {
    this._enabled = value;
    this.updatePagesArray();
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
    this.updatePagesArray();

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
    return this._strategy === PaginationStrategy.Page
      ? this._queryPageStrategy
      : this._queryOffsetStrategy;
  }

  /**
   * Get query for load only count of deleted rows
   */
  get loadDeletedOffsetQuery() {
    return {
      offset: this.limit * this.page - this._removedRows,
      limit: this._removedRows
    }
  }

  get initialized() {
    return !!this.pages;
  }

  get strategy() {
    return this._strategy;
  }

  /**
   * Check if pagination in Page Strategy Mode
   */
  get hasPageStrategy() {
    return this.strategy === PaginationStrategy.Page
  }

  /**
   * Check if pagination in Offset Strategy Mode
   */
  get hasOffsetStrategy() {
    return this.strategy === PaginationStrategy.Offset
  }

  /**
   * If prev page can be activated
   *
   */
  get hasPrevPage(): boolean {
    return this._strategy === PaginationStrategy.Page
      ? this._hasPrevPagePageStrategy
      : this._hasPrevPageOffsetStrategy;
  }

  /**
   * If next page can be activated
   */
  get hasNextPage(): boolean { // Need to check if pages === page && page === 1
    return this._strategy === PaginationStrategy.Page
      ? this._hasNextPagePageStrategy
      : this._hasNextPageOffsetStrategy;
  }

  get loadMoreEnabled(): boolean {
    return this._loadMoreEnabled;
  }

  get loadMoreText(): string {
    return this._loadMoreText;
  }

  public _fromJSON(value): void {
    super._fromJSON(value);

    if (!value.limit) {
      this.limit = 25;
    }
  }

  /**
   * Query for Page Strategy
   */
  private get _queryPageStrategy(): QueryPageStrategy {
    return {
      page: this.page || 1,
      limit: this.limit || 10,
    }
  }

  /**
   * Query for Offset Strategy
   */
  private get _queryOffsetStrategy(): QueryOffsetStrategy {
    const page = this.page - 1 || 0;
    const limit = this.limit || 5;

    return {
      offset: page * limit,
      limit: limit,
    }
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
   * @param displayed
   * @param loadMore
   */
  public updatePaging(config, displayed = 0, loadMore = false) {
    if (!loadMore) {
      this._fromJSON(config);
      this.displayed = displayed;
    } else {
      this.records = config.records;

      if (this.records < this.displayed) {
        this.displayed = this.records;
      }

      this._removedRows = 0;
    }


    this.updateTotalPages();
    this.updatePagesArray();
    // this.updateDisplayed();
  }

  public updatePagingStrategy(strategy?: PaginationStrategy) {
    this._strategy = (strategy === void 0) ? PaginationStrategy.Page : strategy;
  }

  /**
   * Update paging when data source not remove
   * @param {any[]} rows
   */
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
  public updatePagesArray() {
    const MIDDLE = 2;
    const pagesArr = [];

    let from = 0;
    let to = 0;
    if (this.page < MIDDLE) {
      from = MIDDLE - 1;
      to = MIDDLE + 1;
    } else if (this.page >= MIDDLE && this.page <= this.pages - MIDDLE + 1) {
      from = this.page - 1;
      to = this.page + 1;
    } else if (this.page > this.pages - MIDDLE + 1) {
      from = this.pages - MIDDLE - 1;
      to = this.pages;
    }

    if (!this.pages || this.pages < 5) {
      from = 1;
      to = this.pages || 0;
    }

    for (let i = from; i <= to; i++) {
      pagesArr.push(i);
    }

    this.pagesArray = Object.assign([], pagesArr);

  }

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

    this._pageChanged.next({
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
    if (page >= 1 && page <= this.pages && this.page !== page) {
      this.page = page;

      this.updateOffset();

      this._pageChanged.next({
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

      this._pageChanged.next({
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

      this._pageChanged.next({
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

      this._pageChanged.next({
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

      this._pageChanged.next({
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
    this.updatePagesArray();
    // this.updateDisplayed();
  }

  /**
   * Destroy
   */
  public destroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
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
