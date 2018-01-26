import { OnInit } from '@angular/core';
import { Column } from '../../models/column.model';
export declare class FsCellComponent implements OnInit {
    isColl: boolean;
    role: string;
    column: Column;
    row: any;
    rowIndex: number;
    cellContext: any;
    constructor();
    ngOnInit(): void;
    initCellContext(): void;
}
