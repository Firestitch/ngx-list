import { ChangeDetectorRef, ElementRef, KeyValueDiffers } from '@angular/core';
import { FsRowComponent } from '../../body';
export declare class FsFooterRowComponent extends FsRowComponent {
    hasRowActions: boolean;
    constructor(cdRef: ChangeDetectorRef, differs: KeyValueDiffers, el: ElementRef);
}
