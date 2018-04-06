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
    show: Function;
    classArray: string[];
    isShown: boolean;
    constructor(config?: any);
    _fromJSON(value: any): void;
    checkShowStatus(row: any): void;
}
