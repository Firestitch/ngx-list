import { Model } from 'tsmodels';
export declare class ReorderModel extends Model {
    start: Function;
    done: Function;
    label: string;
    menu: boolean;
    constructor(data?: any);
    _fromJSON(data: any): void;
}
