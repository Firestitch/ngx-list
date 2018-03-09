import { Model } from 'tsmodels';
export declare class Action extends Model {
    primary: boolean;
    icon: string;
    label: string;
    menu: boolean;
    click: Function;
    constructor(config?: any);
    _fromJSON(value: any): void;
}
