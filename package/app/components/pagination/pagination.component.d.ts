import { ChangeDetectorRef, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pagination } from '../../models/pagination.model';
export declare class FsPaginationComponent implements OnInit {
    private cdRef;
    pagination: Pagination;
    dataChangedRef: BehaviorSubject<any>;
    constructor(cdRef: ChangeDetectorRef);
    ngOnInit(): void;
}
