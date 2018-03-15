import { Model } from 'tsmodels';
export declare enum ActionType {
    basic = 0,
    raised = 1,
    icon = 2,
    fab = 3,
    miniFab = 4,
}
export declare class RowAction extends Model {
    icon: string;
    label: string;
    menu: boolean;
    click: Function;
    className: string;
    type: ActionType;
    classArray: string[];
    constructor(config?: any);
    _fromJSON(value: any): void;
}
