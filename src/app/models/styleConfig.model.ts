import { Alias, Model } from 'tsmodels';
import * as _isString from 'lodash/isString';

export class StyleConfig extends Model {
  @Alias() public colspan;
  @Alias() public align: string; // Can't be used in tempaltes!
  @Alias() public styleClass: string | string[] = []; // Can't be used in tempaltes!

  public classesArray = []; // Can be used in tempaltes

  constructor(config = {}) {
    super();

    this._fromJSON(config);
  }

  /**
   * Create static array of styles for using in templates
   */
  public updateClasesArray() {
    this.classesArray = [].concat(this.styleClass, this.align);
  }

  /**
   * Prioritized merge for align options
   * @param {StyleConfig} prior1
   * @param {StyleConfig} prior2
   */
  public mergeAlignByPriority(prior1: StyleConfig, prior2: StyleConfig) {
    let targetValue = this.align;

    if (targetValue === void 0) {
      if (prior1.align !== void 0) {
        targetValue = prior1.align;
      } else if (prior2.align !== void 0) {
        targetValue = prior2.align;
      } else {
        targetValue = 'left';
      }
    }

    this.align = targetValue;
  }

  /**
   * Prioritized merge for class options
   * @param {StyleConfig} prior1
   * @param {StyleConfig} prior2
   */
  public mergeClassByPriority(prior1: StyleConfig, prior2: StyleConfig) {
    let targetValue = [];

    if (_isString(this.styleClass)) {
      targetValue.push(this.styleClass);
    }

    if (prior1.styleClass !== void 0) {
      targetValue = this.mergeAnythingIntoArray(targetValue, prior1.styleClass);
    } else if (prior2.styleClass !== void 0) {
      targetValue = this.mergeAnythingIntoArray(targetValue, prior2.styleClass);
    }

    this.styleClass = targetValue;
  }

  /**
   * Merge params into array
   * @param {string[]} to
   * @param {string | string[]} from
   * @returns {string[]}
   */
  private mergeAnythingIntoArray(to: string[], from: string | string[]) {
    if (_isString(from)) {
      to.push(from as string);
    } else if (Array.isArray(from)) {
      to = to.concat(from)
    }

    return to;
  }
}
