import { FsFilter } from '@firestitch/filter';
import { Column } from './column.model';
import { Pagination } from './pagination.model';
import { Sorting } from './sorting.model';
import { Model } from 'tsmodels';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FsListConfig } from '../interfaces';
import { Action } from './action.model';
export declare class FsListModel extends Model {
    title: string;
    inlineFilters: any;
    actions: any;
    rowActions: any;
    rowEvents: any;
    columnTemplates: any;
    filters: any[];
    reoder: any;
    fetchFn: any;
    private _rows;
    filtersQuery: any;
    hasRowActions: any;
    menuActions: Action[];
    kebabActions: Action[];
    columns: Column[];
    persist: string;
    paging: Pagination;
    sorting: Sorting;
    filterService: FsFilter;
    data$: BehaviorSubject<any>;
    status: boolean;
    filterInput: boolean;
    reoderEnabled: boolean;
    loading: boolean;
    hasFooter: boolean;
    initialFetch: boolean;
    private _headerConfig;
    private _cellConfig;
    private _footerConfig;
    constructor(config?: FsListConfig);
    rows: any;
    static create(config: any): FsListModel;
    load(): void;
    loadRemote(query: any): void;
    loadLocal(): void;
    /**
     * Transform templates for using
     * @param templates
     */
    tranformTemplatesToColumns(templates: any): void;
    /**
     * Init paging
     * @param config
     */
    private initPaging(config);
    /**
     * Watch page changes
     */
    private subscribe();
    /**
     * Update and watch filter changes
     */
    private watchFilters();
    private updateColspans(config, updateFlag);
}
