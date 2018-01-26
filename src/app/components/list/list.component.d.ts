import { OnInit, AfterViewInit, QueryList } from '@angular/core';
import { FsListColumnDirective } from '../column/column.component';
export declare class FsListComponent implements OnInit, AfterViewInit {
    config: any;
    columns: any;
    rows: any;
    inlineFilters: boolean;
    /**
     * Set columns to config
     * Create Column Model instances
     *
     * @param {QueryList<FsListColumnDirective>} val
     */
    columnTemplates: QueryList<FsListColumnDirective>;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
