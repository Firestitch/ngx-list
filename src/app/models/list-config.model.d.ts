import { FsFilter } from '@firestitch/filter';
import { Model } from 'tsmodels';
import { IPaging } from '../interfaces';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class FsListConfig extends Model {
    inlineFilters: any;
    topActions: any;
    filters: any;
    columnTemplates: any;
    dataFn: any;
    filtersQuery: {};
    columns: any[];
    persist: string;
    paging: IPaging;
    filterService: FsFilter;
    data$: BehaviorSubject<any>;
    constructor(config?: {});
    static create(config: any): FsListConfig;
    load(query?: {}): void;
    watchFilters(): void;
    tranformTemplatesToColumns(templates: any): void;
}
