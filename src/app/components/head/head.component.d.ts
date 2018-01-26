import { OnInit } from '@angular/core';
import { FsListConfig } from '../../models/list-config.model';
export declare class FsHeadComponent implements OnInit {
    config: FsListConfig;
    rowsContainer: any;
    private rowComponent;
    constructor();
    ngOnInit(): void;
}
