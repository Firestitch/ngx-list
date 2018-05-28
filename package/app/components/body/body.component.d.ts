import { OnInit, DoCheck, ChangeDetectorRef, IterableDiffers, ElementRef, NgZone, TemplateRef } from '@angular/core';
import { Column } from '../../models';
import { FsRowComponent } from './row';
export declare class FsBodyComponent implements OnInit, DoCheck {
    private el;
    private cdRef;
    private differs;
    private zone;
    rows: any;
    columns: Column[];
    hasFooter: boolean;
    rowActionsRaw: any[];
    rowEvents: {};
    reorder: boolean;
    rowsContainer: any;
    headerTemplate: TemplateRef<any>;
    draggable: any;
    private _rowsDiffer;
    constructor(el: ElementRef, cdRef: ChangeDetectorRef, differs: IterableDiffers, zone: NgZone);
    ngOnInit(): void;
    ngDoCheck(): void;
    dragStart(event: any, elemRef: FsRowComponent): void;
}
