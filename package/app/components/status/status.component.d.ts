import { ChangeDetectorRef, OnInit } from '@angular/core';
import { SortingDirection, Pagination, Sorting } from '../../models';
export declare class FsStatusComponent implements OnInit {
    private cdRef;
    paging: Pagination;
    sorting: Sorting;
    dataChangedRef: any;
    OrderDirection: typeof SortingDirection;
    constructor(cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    setDirection(direction: SortingDirection): void;
    setSortableColumn(column: any): void;
    setLimit(limit: any): void;
}
