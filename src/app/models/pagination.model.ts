import { Alias, Model } from 'tsmodels';
import { Subject } from 'rxjs/Subject';
import { FsPaging } from '../interfaces';
import { takeUntil } from 'rxjs/operators';


export class Pagination extends Model {

  @Alias() public limit = 5;
  @Alias() public pages = 0; // Total pages
  @Alias() public records: number;
  @Alias() public manual = false;

  public page = 1; // Active page

  public pagesArray = [];
  public displayed = 0;

  private _pageChanged = new Subject();
  private _onDestroy = new Subject();

  private _enabled = true;
  private _limits = [10, 25, 50, 100, 200];

  constructor(config: FsPaging | any = {}) {
    super();

    this.updatePaging(config);
  }

  /**
   * Fire if page was changed
   */
  get pageChanged() {
    return this._pageChanged.pipe(takeUntil(this._onDestroy));
  }

  /**
   * Get enabled
   * @returns {boolean}
   */
  get enabled() {
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
   * @returns {number[]}
   */
  get limits() {
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
   * @returns {{page: number; limit: number}}
   */
  get query() {
    return {
      page: this.page || 1,
      limit: this.limit || 10,
    }
  }

  get initialized() {
    return !!this.pages;
  }
  /**
   * If prev page can be activated
   * @returns {boolean}
   */
  get hasPrevPage() {
    return this.page > 1 && this.pages > 1;
  }

  /**
   * If next page can be activated
   * @returns {boolean}
   */
  get hasNextPage() { // Need to check if pages === page && page === 1
    return this.page < this.pages && this.pages > 1;
  }

  /**
   * Update paging config and all related fields
   * @param config
   */
  public updatePaging(config) {
    this._fromJSON(config);

    this.updatePagesArray();
    this.updateDisplayed();
  }

  /**
   * Update paging when data source not remove
   * @param {any[]} rows
   */
  public updatePagingManual(rows: any[]) {
    if (Array.isArray(rows) && rows.length > 0) {
      this.records = rows.length;
      this.pages = Math.ceil(rows.length / this.limit);
    }

    this.updatePagesArray();
    this.updateDisplayed();
  }

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

  /**
   * Update dispayed records counter
   */
  public updateDisplayed() {
    if (this.records > this.limit) {
      this.displayed = this.limit;
    } else {
      this.displayed = this.records;
    }
  }

  /**
   * Set new limit
   * @param limit
   */
  public setLimit(limit) {
    this.limit = limit;
    this.resetPaging();
    this._pageChanged.next();
  }

  /**
   * If page is activate page
   * @param page
   * @returns {boolean}
   */
  public isActive(page) {
    return page === this.page;
  }

  /**
   * Go to page
   * @param page
   */
  public goToPage(page) {
    if (page >= 1 && page <= this.pages && this.page !== page) {
      this.page = page;
      this._pageChanged.next(page);
    }
  }

  public resetPaging() {
    this.page = 1;
  }

  /**
   * Go to next page
   */
  public goNext() {
    if (this.hasNextPage) {
      this.page++;
      this._pageChanged.next(this.page);
    }
  }

  /**
   * Go to first page
   */
  public goFirst() {
    if (this.page > 1) {
      this.page = 1;
      this._pageChanged.next(this.page);
    }
  }

  /**
   * Go to prev page
   */
  public goPrev() {
    if (this.page > 1) {
      this.page--;
      this._pageChanged.next(this.page);
    }
  }

  /**
   * Go to last page
   */
  public goLast() {
    if (this.page < this.pages) {
      this.page = this.pages;
      this._pageChanged.next(this.page);
    }
  }

  /**
   * Destroy
   */
  public destroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
