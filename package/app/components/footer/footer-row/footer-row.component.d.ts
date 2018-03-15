import { ChangeDetectorRef, ElementRef, KeyValueDiffers, Renderer2 } from '@angular/core';
import { FsRowComponent } from '../../body';
export declare class FsFooterRowComponent extends FsRowComponent {
    hasRowActions: boolean;
    constructor(cdRef: ChangeDetectorRef, differs: KeyValueDiffers, el: ElementRef, renderer: Renderer2);
}
