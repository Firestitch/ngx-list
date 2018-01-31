import { ChangeDetectorRef, DoCheck, KeyValueDiffers } from '@angular/core';
import { FsCellComponent } from '../../body/row/cell/cell.component';
export declare class FsHeadCellComponent extends FsCellComponent implements DoCheck {
    private cdRef;
    private differs;
    cellContext: any;
    private _columnDiffer;
    constructor(cdRef: ChangeDetectorRef, differs: KeyValueDiffers);
    ngDoCheck(): void;
    initCellContext(): void;
}
