import { ChangeDetectorRef, ElementRef, IterableDiffers, NgZone } from '@angular/core';
import { FsBodyComponent } from '../body/body.component';
export declare class FsFooterComponent extends FsBodyComponent {
    hasRowActions: boolean;
    constructor(el: ElementRef, cdRef: ChangeDetectorRef, differs: IterableDiffers, zone: NgZone);
}
