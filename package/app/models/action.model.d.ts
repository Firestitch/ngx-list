import { Model } from 'tsmodels';
export declare class Action extends Model {
    primary: boolean;
    icon: string;
    label: string;
    click: Function;
    constructor(config?: any);
}
