import { TemplateRef } from '@angular/core';
import { CellConfig } from '../../interfaces/cellconfig.interface';
export declare class FsListColumnDirective {
    title: string;
    name: string;
    sortable: boolean;
    align: string;
    width: string;
    className: string | string[];
    headerTemplate: TemplateRef<any>;
    headerConfigs: CellConfig;
    rowTemplate: TemplateRef<any>;
    cellConfigs: CellConfig;
    footerTemplate: TemplateRef<any>;
    footerConfigs: CellConfig;
}
