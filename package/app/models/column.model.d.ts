import { Model } from 'tsmodels';
import { TemplateRef } from '@angular/core';
import { StyleConfig } from './styleConfig.model';
export declare enum SortingDirection {
    asc = 0,
    desc = 1,
}
export declare class Column extends Model {
    title: string;
    name: string;
    width: string;
    sortable: boolean;
    headerTemplate: TemplateRef<any>;
    rowTemplate: TemplateRef<any>;
    footerTemplate: TemplateRef<any>;
    headerConfigs: StyleConfig;
    cellConfigs: StyleConfig;
    footerConfigs: StyleConfig;
    colStyles: StyleConfig;
    sortingDirection: SortingDirection;
    headerColspanned: boolean;
    cellColspanned: boolean;
    footerColspanned: boolean;
    private _ordered;
    constructor(colConfig?: any, colDefaults?: any);
    readonly direction: string;
    readonly fullNameDirection: string;
    ordered: boolean;
    /**
     * Merge with defaults with existing config
     * @param defaults
     */
    mergeWithColumnDefaults(defaults: any): void;
    /**
     * Change sorting direction
     */
    changeDirection(): void;
}
