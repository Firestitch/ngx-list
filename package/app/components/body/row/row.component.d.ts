import { ChangeDetectorRef, DoCheck, KeyValueDiffers } from '@angular/core';
import { Column } from '../../../models/column.model';
export declare class FsRowComponent implements DoCheck {
    private cdRef;
    private differs;
    t: boolean;
    role: string;
    row: any;
    rowActions: any[];
    rowIndex: number;
    columns: Column[];
    private _rowDiffer;
    constructor(cdRef: ChangeDetectorRef, differs: KeyValueDiffers);
    ngDoCheck(): void;
}
