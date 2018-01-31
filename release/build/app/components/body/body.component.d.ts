import { ChangeDetectorRef, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Column } from '../../models/column.model';
export declare class FsBodyComponent implements OnInit {
    private cdRef;
    private _componentFactoryResolver;
    rows: any;
    columns: Column[];
    rowsContainer: any;
    private _rowComponent;
    private _rows;
    constructor(cdRef: ChangeDetectorRef, _componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    initRowsComponents(): void;
    initRowComponent(data: any, index: any): void;
}
