import { Model } from 'tsmodels';
import { IPaging } from '../interfaces';
import { Subject } from 'rxjs/Subject';
export declare class Pagination extends Model {
    limit: number;
    pages: number;
    page: number;
    records: number;
    pageChanged: Subject<{}>;
    pagesArray: any[];
    displayed: number;
    private _enabled;
    private _limits;
    constructor(config?: IPaging | any);
    /**
     * Get enabled
     * @returns {boolean}
     */
    /**
     * Set enabled and update pages array
     * @param value
     */
    enabled: boolean;
    /**
     * Get Limits
     * @returns {number[]}
     */
    /**
     * Set limits, update pages array and set new limit per page
     * @param value
     */
    limits: number[];
    /**
     * Get query for request
     * @returns {{page: number; limit: number}}
     */
    readonly query: {
        page: number;
        limit: number;
    };
    /**
     * If prev page can be activated
     * @returns {boolean}
     */
    readonly hasPrevPage: boolean;
    /**
     * If next page can be activated
     * @returns {boolean}
     */
    readonly hasNextPage: boolean;
    /**
     * Update paging config and all related fields
     * @param config
     */
    updatePaging(config: any): void;
    /**
     * Update pages array with new pages count
     */
    updatePagesArray(): void;
    /**
     * Update dispayed records counter
     */
    updateDisplayed(): void;
    /**
     * Set new limit
     * @param limit
     */
    setLimit(limit: any): void;
    /**
     * If page is activate page
     * @param page
     * @returns {boolean}
     */
    isActive(page: any): boolean;
    /**
     * Go to page
     * @param page
     */
    goToPage(page: any): void;
    resetPaging(): void;
    /**
     * Go to next page
     */
    goNext(): void;
    /**
     * Go to first page
     */
    goFirst(): void;
    /**
     * Go to prev page
     */
    goPrev(): void;
    /**
     * Go to last page
     */
    goLast(): void;
}
