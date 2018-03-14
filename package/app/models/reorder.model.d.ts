import { Model } from 'tsmodels';
export declare class ReorderModel extends Model {
    done: Function;
    label: string;
    menu: boolean;
    constructor(data?: any);
    _fromJSON(data: any): void;
}
