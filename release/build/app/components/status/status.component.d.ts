import { ChangeDetectorRef, OnInit } from '@angular/core';
import { SortingDirection } from '../../models/column.model';
import { Pagination } from '../../models/pagination.model';
import { Sorting } from '../../models/sorting.model';
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
