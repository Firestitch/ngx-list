import { Alias, Model } from 'tsmodels';
import { isString } from 'lodash-es';

export class StyleConfig extends Model {
  @Alias() public colspan;
  @Alias() public align: string; // Can't be used in tempaltes!
  @Alias() public className: string | string[] = []; // Can't be used in tempaltes!

  public classesArray = []; // Can be used in tempaltes
  public classesString = '';

  constructor(config = {}) {
    super();

    this._fromJSON(config);
  }

  /**
   * Create static array of styles for using in templates
   */
  public updateClasesArray() {
    this.classesArray = [].concat(this.className, this.align);
    this.classesString = [].concat(this.className, this.align).join(' ');
  }

  /**
   * Prioritized merge for align options
   * @param prior1
   * @param prior2
   */
  public mergeAlignByPriority(prior1: StyleConfig, prior2: StyleConfig) {
    let targetValue = this.align;

    if (targetValue === void 0) {
      if (prior1 && prior1.align !== void 0) {
        targetValue = prior1.align;
      } else if (prior2 && prior2.align !== void 0) {
        targetValue = prior2.align;
      } else {
        targetValue = 'left';
      }
    }

    this.align = targetValue;
  }

  /**
   * Prioritized merge for class options
   * @param prior1
   * @param prior2
   */
  public mergeClassByPriority(prior1: StyleConfig, prior2: StyleConfig) {
    let targetValue = [];

    if (Array.isArray(this.className)) {
      targetValue = targetValue.concat(this.className);
    } else if (isString(this.className)) {
      targetValue.push(this.className);
    }

    if (prior1 && prior1.className !== void 0) {
      this.mergeAnythingIntoArray(targetValue, prior1.className);
    } else if (prior2 && prior2.className !== void 0) {
      this.mergeAnythingIntoArray(targetValue, prior2.className);
    }

    this.className = targetValue;
  }

  /**
   * Merge params into array
   * @param to
   * @param from
   */
  private mergeAnythingIntoArray(to: string[], from: string | string[]) {
    if (isString(from)) {
      to.push(from as string);
    } else if (Array.isArray(from)) {
      to.push(...from)
    }
  }
}
