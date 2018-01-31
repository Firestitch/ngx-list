import { Model } from 'tsmodels';
import { TemplateRef } from '@angular/core';
export declare enum SortingDirection {
    asc = 0,
    desc = 1,
}
export declare class Column extends Model {
    title: string;
    name: string;
    sortable: boolean;
    headerAlign: string;
    headerClass: string | string[];
    cellAlign: string;
    cellClass: string | string[];
    template: TemplateRef<any>;
    sortingDirection: SortingDirection;
    headStyles: any[];
    cellStyles: any[];
    private _ordered;
    constructor(colConfig?: any);
    readonly direction: string;
    readonly fullNameDirection: string;
    ordered: boolean;
    getAlignClass(align: any): any;
    getClassesArray(align: any, cssClass: any): any[];
    changeDirection(): void;
}
