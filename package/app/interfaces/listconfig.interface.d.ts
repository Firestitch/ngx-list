export interface FsPaging {
    limits?: number[];
    limit?: number;
    page?: number;
    pages?: number;
    records?: number;
}
export interface FsListConfig {
    title?: string;
    status?: boolean;
    filterInput?: boolean;
    paging?: FsPaging;
    columnDefaults?: Object;
    filters?: Object[];
    rowActions?: Object[];
    actions?: Object[];
    fetch?: Function;
    initialFetch?: boolean;
    rowEvents?: Object;
    header?: FsListHeaderConfig;
    cell?: FsListCellConfig;
    footer?: FsListFooterConfig;
    reoder?: FsListReorderConfig;
}
export interface FsListReorderConfig {
    done?: Function;
    label?: string;
    menu?: boolean;
}
export interface FsListHeaderConfig {
    className?: string;
    align?: string;
}
export interface FsListCellConfig {
    className?: string;
    align?: string;
}
export interface FsListFooterConfig {
    className?: string;
    align?: string;
}
