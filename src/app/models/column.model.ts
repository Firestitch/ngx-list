import { Alias, Model } from 'tsmodels';
import { TemplateRef } from '@angular/core';
import * as _isObject from 'lodash/isObject';
import * as _isString from 'lodash/isString';

export enum SortingDirection {
  asc = 0,
  desc = 1
}

const ALLOWED_DEFAULTS = [
  'title',
  'sortable',
  'headerAlign',
  'headerClass',
  'cellAlign',
  'cellClass',
];

const ALLOWED_TOBE_ARRAY = [
  'headerClass',
  'cellClass',
];

export class Column extends Model {
  @Alias() public title: string;
  @Alias() public name: string;
  @Alias() public sortable: boolean;
  @Alias() public headerAlign: string;
  @Alias() public headerClass: string | string[] = '';
  @Alias() public cellAlign: string;
  @Alias() public cellClass: string | string[] = '';

  public template: TemplateRef<any>;
  public sortingDirection: SortingDirection;
  public headStyles = [];
  public cellStyles = [];
  private _ordered = false;

  constructor(colConfig: any = {}, colDefaults: any = false) {
    super();

    this._fromJSON(colConfig);
    this.mergeWithColumnDefaults(colDefaults);

    if (colConfig.template) {
      this.template = colConfig.template;
    }

    this.headStyles = this.getClassesArray(this.headerAlign, this.headerClass);
    this.cellStyles = this.getClassesArray(this.cellAlign, this.cellClass);
  }

  get direction() {
    return (this.sortingDirection === SortingDirection.asc) ? 'asc' : 'desc';
  }

  get fullNameDirection() {
    return (this.sortingDirection === SortingDirection.asc) ? 'ascending' : 'descending';
  }

  get ordered() {
    return this._ordered;
  }

  set ordered(value) {
    this._ordered = value;

    if (value) {
      this.sortingDirection = SortingDirection.asc;
    }
  }

  /**
   * Merge with defaults with existing config
   * @param defaults
   */
  public mergeWithColumnDefaults(defaults) {
    if (_isObject(defaults)) { // Defaults must be object in any case
      const defKeys = Object.keys(defaults);

      if (defKeys.length > 0) {
        defKeys.forEach((key) => { // Do changes for each key
          if (ALLOWED_DEFAULTS.indexOf(key) === -1) { return; } // If key doesn't allowed - then skip

          if (this[key] === void 0) { // Assign default value if key wasn't defined
            this[key] = defaults[key];
          } else if (ALLOWED_TOBE_ARRAY.indexOf(key) > -1) { // or if key can be array, then we need to do spec actions
            if (_isString(this[key])) { // if key string, then transform to array and assign default value
              this[key] = this[key].split(' ').concat(defaults[key])
            } else if (Array.isArray(this[key])) { // if array then just concat
              this[key] = this[key].concat(defaults[key]);
            } else { // in any cases concat both values into new array
              this[key] = [].concat(this[key], defaults[key]);
            }
          }
        });
      }
    }
  }

  public getAlignClass(align) {
    if (align && ['left', 'center', 'right'].indexOf(align) > -1) {
      return align
    } else {
      return 'left'
    }
  }

  public getClassesArray(align, cssClass) {
    const alignClass = this.getAlignClass(align) || [];
    let classArray = [];

    if (Array.isArray(cssClass)) {
      classArray = classArray.concat(cssClass, alignClass);
    } else if (cssClass) {
      classArray = classArray.concat(cssClass, alignClass);
    } else {
      classArray = classArray.concat(this.getAlignClass(align));
    }

    return classArray;
  }

  public changeDirection() {
    if (this.sortingDirection === SortingDirection.asc) {
      this.sortingDirection = SortingDirection.desc;
    } else {
      this.sortingDirection = SortingDirection.asc;
    }
  }
}
