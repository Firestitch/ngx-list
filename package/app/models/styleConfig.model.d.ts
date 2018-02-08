import { Model } from 'tsmodels';
export declare class StyleConfig extends Model {
    colspan: any;
    align: string;
    className: string | string[];
    classesArray: any[];
    constructor(config?: {});
    /**
     * Create static array of styles for using in templates
     */
    updateClasesArray(): void;
    /**
     * Prioritized merge for align options
     * @param {StyleConfig} prior1
     * @param {StyleConfig} prior2
     */
    mergeAlignByPriority(prior1: StyleConfig, prior2: StyleConfig): void;
    /**
     * Prioritized merge for class options
     * @param {StyleConfig} prior1
     * @param {StyleConfig} prior2
     */
    mergeClassByPriority(prior1: StyleConfig, prior2: StyleConfig): void;
    /**
     * Merge params into array
     * @param {string[]} to
     * @param {string | string[]} from
     * @returns {string[]}
     */
    private mergeAnythingIntoArray(to, from);
}
