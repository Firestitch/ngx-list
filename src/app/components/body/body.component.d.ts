import { ChangeDetectorRef, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Column } from '../../models/column.model';
import { FsListConfig } from '../../models/list-config.model';
export declare class FsBodyComponent implements OnInit {
    private cdRef;
    private _componentFactoryResolver;
    config: FsListConfig;
    columns: Column[];
    rowsContainer: any;
    rows: any;
    private rowComponent;
    constructor(cdRef: ChangeDetectorRef, _componentFactoryResolver: ComponentFactoryResolver);
    ngOnInit(): void;
    initRowComponent(data: any, index: any): void;
}
