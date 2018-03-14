import { OnInit, OnDestroy } from '@angular/core';
import { FsListModel } from '../../models/list-config.model';
import { FsListConfig } from '../../interfaces/listconfig.interface';
export declare class FsListComponent implements OnInit, OnDestroy {
    config: FsListConfig;
    displayRows: any;
    listConfig: FsListModel;
    /**
     * Set columns to config
     * Create Column Model instances
     *
     * @param {QueryList<FsListColumnDirective>} val
     */
    private columnTemplates;
    ngOnInit(): void;
    ngOnDestroy(): void;
    nextPage(): void;
    prevPage(): void;
    firstPage(): void;
    lastPage(): void;
    load(): void;
    enableOrder(): void;
    finishReorder(): void;
}
