import { Column } from './column.model';
import { FsListModel } from './list-config.model';
import { Subject } from 'rxjs/Subject';
export declare class Sorting {
    config: FsListModel;
    tableColumns: Column[];
    sortingColumns: Column[];
    fakeSortingColumns: Column[];
    sortingColumn: Column;
    sortingChanged: Subject<{}>;
    constructor(columns: any);
    addSortableColumn(column: Column): void;
    /**
     * Set Sortable Direction
     * @param direction
     */
    setSortDirection(direction: any): void;
    /**
     * Sort By
     * @param column
     * @param doubleSelectBehaviour - when user click twice on same param
     */
    sortBy(column: Column, doubleSelectBehaviour?: boolean): boolean;
    /**
     * Init fake columns for sorting
     * @param columns
     */
    initFakeColumns(columns: any): void;
    /**
     * Set initial sorting
     * @param {string} sort
     */
    initialSortBy(sort: string): void;
    /**
     * Sort by first of available sorting columns
     */
    sortByFirstSortbale(): void;
}
