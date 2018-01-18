import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FsFilter } from '@firestitch/filter';
export interface FsListColumn {
    title: string;
    align?: 'left' | 'center' | 'right';
    template?: string;
    data?: object;
}
export interface FsListCell {
    value?: string;
    onclick?: any;
    onhover?: any;
    html?: string;
    parts?: FsListPart[];
    icon?: string;
}
export interface FsListPart {
    value?: string;
    onclick?: any;
    onhover?: any;
    html?: string;
    icon?: string;
}
export interface TopActions {
    label: string;
    primary: boolean;
    raised: boolean;
    click(): void;
}
export declare class FsList {
    persist: string;
    inlineFilters: boolean;
    columns: FsListColumn[];
    topActions: TopActions[];
    imports: any[];
    data$: BehaviorSubject<Array<Array<FsListCell>> | any>;
    filters: any[];
    filterService: FsFilter;
    filtersQuery: {};
    static create(config: any): FsList;
    constructor(config: any);
    data(query: any): void;
    load(query: any): void;
}
