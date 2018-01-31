import { FsFilter } from '@firestitch/filter';
import { Model } from 'tsmodels';
import { Column } from './column.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pagination } from './pagination.model';
import { Sorting } from './sorting.model';
export declare class FsListConfig extends Model {
    inlineFilters: any;
    actions: any;
    rowActions: any;
    rowEvents: any;
    columnTemplates: any;
    dataFn: any;
    filters: any[];
    filtersQuery: any;
    columns: Column[];
    persist: string;
    paging: Pagination;
    sorting: Sorting;
    filterService: FsFilter;
    data$: BehaviorSubject<any>;
    loading: boolean;
    constructor(config?: any);
    static create(config: any): FsListConfig;
    load(): void;
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
}
