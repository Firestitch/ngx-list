
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { FsFilter }  from '@firestitch/filter';

export interface FsListColumn {
    title: string;
    align?: 'left' | 'center' | 'right';
    template?: string;
    // onClick?: any;
    data?: object;
};

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

export class FsList {
    public persist: string;
    public inlineFilters = false;
    public columns: FsListColumn[];
    public topActions: TopActions[] = [];
    // Modules available for column templates
    public imports: Array<any> = [];
    public data$: BehaviorSubject<Array<Array<FsListCell>> | any> = new BehaviorSubject<Array<Array<FsListCell>> | any>([]);

    public filters = [];
    public filterService = new FsFilter();
    public filtersQuery = {};


    static create(config: any) {
        return new FsList(config);
    }

    constructor(config: any) {
        Object.assign(this, config || {});
    }
    /*
    setConfig(config: any) {
        Object.assign(this, config || {});
    }
    */
    // Populated from config
    data (query) { }

    load(query) {

        this.filtersQuery = query;

        const result: any = this.data(this.filtersQuery);

        if (result instanceof Promise) {
            result.then(response => {
                this.data$.next(response.data);
            });
        }else if (result instanceof Observable) {
            result.subscribe(response => {
                this.data$.next(response.data);
            });
        }
    }
}
