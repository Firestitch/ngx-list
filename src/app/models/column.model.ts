import { Alias, Model } from 'tsmodels';
import { TemplateRef } from '@angular/core';
import * as _isObject from 'lodash/isObject';
import * as _isString from 'lodash/isString';
import * as _isBoolean from 'lodash/isBoolean';
import { CellOptions } from '../interfaces';
import { StyleConfig } from './styleConfig.model';

export enum SortingDirection {
  asc = 0,
  desc = 1
}

const ALLOWED_DEFAULTS = [
  'title',
  'sortable',
  'align',
  'class'
  // 'headerAlign',
  // 'headerClass',
  // 'cellAlign',
  // 'cellClass',
  // 'colAlign',
  // 'colClass',
];

const ALLOWED_TOBE_ARRAY = [
  'headerClass',
  'cellClass',
  'colClass'
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
  @Alias() public headerTemplate: TemplateRef<any>;
  @Alias() public rowTemplate: TemplateRef<any>;

  @Alias('headerConfigs', StyleConfig) public headerConfigs: StyleConfig = new StyleConfig();
  @Alias('cellConfigs', StyleConfig) public cellConfigs: StyleConfig = new StyleConfig();

  public colStyles: StyleConfig;
  public sortingDirection: SortingDirection;

  private _ordered = false;

  constructor(colConfig: any = {}, colDefaults: any = false) {
    super();

    this._fromJSON(colConfig);
    this.colStyles = new StyleConfig(colConfig);

    this.mergeWithColumnDefaults(colDefaults);

    // if (colConfig.headerTemplate) {
    //   this.headerTemplate = colConfig.headerTemplate;
    // }
    //
    // if (colConfig.rowTemplate) {
    //   this.rowTemplate = colConfig.rowTemplate;
    // }
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
    if (!_isObject(defaults)) { defaults = {} }

    const defaultHeader = new StyleConfig({ align: defaults.headerAlign, styleClass: defaults.headerClass});
    const defaultCell = new StyleConfig({ align: defaults.cellAlign, styleClass: defaults.cellClass});

    ALLOWED_DEFAULTS.forEach((key) => {
      switch (key) {
        case 'title': {
          this.title = this.title || defaults.title;
        } break;

        case 'sortable': {
          if (_isBoolean(defaults.sortable)) {
            if (this.sortable === void 0) {
              this.sortable = defaults.sortable;
            }
          }
        } break;

        case 'class': {
          this.headerConfigs.mergeClassByPriority(this.colStyles, defaultHeader);
          this.cellConfigs.mergeClassByPriority(this.colStyles, defaultCell);
        } break;

        case 'align': {
          this.headerConfigs.mergeAlignByPriority(this.colStyles, defaultHeader);
          this.cellConfigs.mergeAlignByPriority(this.colStyles, defaultCell);
        } break;
      }
    });

    this.headerConfigs.updateClasesArray();
    this.cellConfigs.updateClasesArray();
  }

  public changeDirection() {
    if (this.sortingDirection === SortingDirection.asc) {
      this.sortingDirection = SortingDirection.desc;
    } else {
      this.sortingDirection = SortingDirection.asc;
    }
  }
}
