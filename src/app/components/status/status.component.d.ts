import { OnInit } from '@angular/core';
import { IPaging } from '../../interfaces';
export declare class FsStatusComponent implements OnInit {
    paging: IPaging;
    constructor();
    readonly displayedRecords: number;
    readonly total: number;
    ngOnInit(): void;
}
