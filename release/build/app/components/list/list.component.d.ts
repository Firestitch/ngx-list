import { OnInit, QueryList, ChangeDetectorRef } from '@angular/core';
import { FsListColumnDirective } from '../../directives';
export declare class FsListComponent implements OnInit {
    private cdRef;
    config: any;
    columns: any;
    inlineFilters: boolean;
    rows: any;
    /**
     * Set columns to config
     * Create Column Model instances
     *
     * @param {QueryList<FsListColumnDirective>} val
     */
    columnTemplates: QueryList<FsListColumnDirective>;
    constructor(cdRef: ChangeDetectorRef);
    actionClick(): void;
    ngOnInit(): void;
}
