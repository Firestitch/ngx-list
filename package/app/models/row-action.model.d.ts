import { Model } from 'tsmodels';
export declare enum ActionType {
    basic = "basic",
    raised = "raised",
    icon = "icon",
    fab = "fab",
    miniFab = "mini-fab",
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
