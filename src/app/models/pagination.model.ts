import { Alias, Model} from 'tsmodels';
import { IPaging } from '../interfaces';
import { Subject } from 'rxjs/Subject';

export class Pagination extends Model {

  @Alias() public limit = 5;
  @Alias() public pages = 0; // Total pages
  @Alias() public page = 1; // Active page
  @Alias() public records: number;

  public pageChanged = new Subject();
  public pagesArray = [];
  public displayed = 0;

  private _enabled = true;
  private _limits = [10, 25, 50, 100, 200];

  constructor(config: IPaging | any = {}) {
    super();

    this.updatePaging(config);
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
  get hasNextPage() {
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
   * Update pages array with new pages count
   */
  public updatePagesArray() {
    this.pagesArray = Array(this.pages).fill(null).map((x, i) => i + 1);
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
    this.pageChanged.next();
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
      this.pageChanged.next(page);
    }
  }

  public resetPaging() {
    this.page = 1;
  }

  /**
   * Go to next page
   */
  public goNext() {
    if (this.page < this.pages) {
      this.page++;
      this.pageChanged.next(this.page);
    }
  }

  /**
   * Go to first page
   */
  public goFirst() {
    if (this.page > 1) {
      this.page = 1;
      this.pageChanged.next(this.page);
    }
  }

  /**
   * Go to prev page
   */
  public goPrev() {
    if (this.page > 1) {
      this.page--;
      this.pageChanged.next(this.page);
    }
  }

  /**
   * Go to last page
   */
  public goLast() {
    if (this.page < this.pages) {
      this.page = this.pages;
      this.pageChanged.next(this.page);
    }
  }
}
