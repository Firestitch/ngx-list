import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Sorting } from '../../models/sorting.model';
import { Column } from '../../index';
export declare class FsHeadComponent implements OnInit {
    private cdRef;
    sorting: Sorting;
    columns: Column[];
    rowsContainer: any;
    constructor(cdRef: ChangeDetectorRef);
    ngOnInit(): void;
}
