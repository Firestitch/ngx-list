export interface FsPaging {
    limits?: number[];
    limit?: number;
    page?: number;
    pages?: number;
    records?: number;
}
export interface FsListConfig {
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