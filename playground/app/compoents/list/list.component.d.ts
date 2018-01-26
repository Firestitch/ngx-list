import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FsApi } from '@firestitch/api';
import { FsListConfig } from '../../../../src/app/models/list-config.model';
import 'rxjs/add/operator/map';
export declare class ListComponent implements OnInit {
    private _fsApi;
    private _router;
    config: FsListConfig;
    constructor(_fsApi: FsApi, _router: Router);
    ngOnInit(): void;
    onClick(event: any, row: any): void;
    proceed(link: any): void;
}
