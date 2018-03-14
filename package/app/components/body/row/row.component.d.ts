import { ChangeDetectorRef, DoCheck, ElementRef, EventEmitter, KeyValueDiffers } from '@angular/core';
import { Column } from '../../../models/column.model';
export declare class FsRowComponent implements DoCheck {
    private el;
    private cdRef;
    private differs;
    t: boolean;
    role: string;
    row: any;
    rowActions: any[];
    rowIndex: number;
    columns: Column[];
    reorder: boolean;
    startDragging: EventEmitter<{}>;
    stopDragging: EventEmitter<{}>;
    mousedow(event: any): void;
    private _rowDiffer;
    constructor(el: ElementRef, cdRef: ChangeDetectorRef, differs: KeyValueDiffers);
    ngDoCheck(): void;
}
