import { ChangeDetectorRef, DoCheck, IterableDiffers } from '@angular/core';
import { Column } from '../../models/column.model';
export declare class FsBodyComponent implements DoCheck {
    private cdRef;
    private differs;
    rows: any;
    columns: Column[];
    hasFooter: boolean;
    rowActions: any[];
    rowsContainer: any;
    private _rowsDiffer;
    constructor(cdRef: ChangeDetectorRef, differs: IterableDiffers);
    ngDoCheck(): void;
}
