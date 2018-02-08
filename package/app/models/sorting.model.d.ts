import { Column } from './column.model';
import { FsListModel } from './list-config.model';
import { Subject } from 'rxjs/Subject';
export declare class Sorting {
    config: FsListModel;
    tableColumns: Column[];
    sortingColumns: Column[];
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
}
