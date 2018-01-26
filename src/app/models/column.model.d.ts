import { Model } from 'tsmodels';
import { TemplateRef } from '@angular/core';
export declare class Column extends Model {
    title: any;
    align: any;
    name: any;
    cssClass: any;
    template: TemplateRef<any>;
    constructor(colConfig?: any);
}
