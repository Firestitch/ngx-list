import { AfterViewInit, Compiler, Injector, NgModuleRef, ViewContainerRef, QueryList, ApplicationRef } from '@angular/core';
import { FsList } from '../../../fslist';
export declare class FsListComponent implements AfterViewInit {
    private compiler;
    private _injector;
    private _m;
    private app;
    components: any[];
    list: FsList;
    vc: any;
    items: QueryList<ViewContainerRef>;
    constructor(compiler: Compiler, _injector: Injector, _m: NgModuleRef<any>, app: ApplicationRef);
    ngAfterViewInit(): void;
    renderColumns(): void;
    topActionsClick(action: any, $event: any): void;
}
