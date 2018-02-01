import { Alias, Model } from 'tsmodels';
import { TemplateRef } from '@angular/core';
import * as _isObject from 'lodash/isObject';
import * as _isString from 'lodash/isString';
import { CellOptions } from '../interfaces';

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

const EXTERNAL_OPTIONS = [
  'headerAlign',
  'headerClass',
  'cellAlign',
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
  @Alias() public headerOptions: CellOptions;
  @Alias() public cellOptions: CellOptions;

  public headerTemplate: TemplateRef<any>;
  public rowTemplate: TemplateRef<any>;
  public sortingDirection: SortingDirection;
  public headStyles = [];
  public cellStyles = [];
  private _ordered = false;

  constructor(colConfig: any = {}, colDefaults: any = false) {
    super();

    this._fromJSON(colConfig);
    this.mergeWithColumnDefaults(colDefaults);

    if (colConfig.headerTemplate) {
      this.headerTemplate = colConfig.headerTemplate;
    }

    if (colConfig.rowTemplate) {
      this.rowTemplate = colConfig.rowTemplate;
    }

    if (this.headerOptions) {
      this.headStyles = this.getClassesArray(this.headerOptions);
    }

    if (this.cellOptions) {
      this.cellStyles = this.getClassesArray(this.cellOptions);
    }
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

          if (EXTERNAL_OPTIONS.indexOf(key) === -1) {
            if (this[key] === void 0) { // Assign default value if key wasn't defined
              this[key] = defaults[key];
            }
          } else {
            if (ALLOWED_TOBE_ARRAY.indexOf(key) > -1) { // or if key can be array, then we need to do spec actions
              const valueOfKey = this.getOptionFromExternalOptions(key);
              let valueForKey = void 0;
              if (_isString(valueOfKey)) { // if key string, then transform to array and assign default value
                valueForKey = (valueOfKey as String).split(' ').concat(defaults[key])
              } else if (Array.isArray(valueOfKey)) { // if array then just concat
                valueForKey = valueOfKey.concat(defaults[key]);
              } else if (valueOfKey) { // in any cases concat both values into new array
                valueForKey = [].concat(valueOfKey, defaults[key]);
              } else {
                valueForKey = [].concat(defaults[key]);
              }

              this.setOptionForExtenalOptions(key, valueForKey);
            }
          }
          /*if (this[key] === void 0) { // Assign default value if key wasn't defined
            this[key] = defaults[key];
          } else if (ALLOWED_TOBE_ARRAY.indexOf(key) > -1) { // or if key can be array, then we need to do spec actions
            if (_isString(this[key])) { // if key string, then transform to array and assign default value
              this[key] = this[key].split(' ').concat(defaults[key])
            } else if (Array.isArray(this[key])) { // if array then just concat
              this[key] = this[key].concat(defaults[key]);
            } else { // in any cases concat both values into new array
              this[key] = [].concat(this[key], defaults[key]);
            }
          }*/
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

  public getClassesArray(options: CellOptions) {
    const alignClass = this.getAlignClass(options.align) || [];
    let classArray = [];

    if (Array.isArray(options.styleClass)) {
      classArray = classArray.concat(options.styleClass, alignClass);
    } else if (options.styleClass) {
      classArray = classArray.concat(options.styleClass, alignClass);
    } else {
      classArray = classArray.concat(this.getAlignClass(options.align));
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

  private getOptionFromExternalOptions(key) {
    if (!this.headerOptions) {
      this.headerOptions = {};
    }

    if (!this.cellOptions) {
      this.cellOptions = {};
    }

    switch (key) {
      case 'headerAlign': return this.headerOptions.align;
      case 'headerClass': return this.headerOptions.styleClass;
      case 'cellAlign': return this.cellOptions.align;
      case 'cellClass': return this.cellOptions.styleClass;
    }
  };

  private setOptionForExtenalOptions(key, value) {
    switch (key) {
      case 'headerAlign': this.headerOptions.align = value; break;
      case 'headerClass': this.headerOptions.styleClass = value; break;
      case 'cellAlign': this.cellOptions.align = value; break;
      case 'cellClass': this.cellOptions.styleClass = value; break;
    }
  }
}
