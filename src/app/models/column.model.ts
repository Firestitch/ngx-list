import { Alias, Model } from 'tsmodels';
import { TemplateRef } from '@angular/core';
import { isObject, isBoolean } from 'lodash-es';

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
];

export class Column extends Model {
  @Alias() public title: string;
  @Alias() public name: string;
  @Alias() public width: string;
  @Alias() public sortable: boolean;
  @Alias() public headerTemplate: TemplateRef<any>;
  @Alias() public rowTemplate: TemplateRef<any>;
  @Alias() public footerTemplate: TemplateRef<any>;

  @Alias('headerConfigs', StyleConfig)
  public headerConfigs: StyleConfig = new StyleConfig();

  @Alias('cellConfigs', StyleConfig)
  public cellConfigs: StyleConfig = new StyleConfig();

  @Alias('footerConfigs', StyleConfig)
  public footerConfigs: StyleConfig = new StyleConfig();

  public colStyles: StyleConfig;
  public sortingDirection: SortingDirection;

  public headerColspanned = false;
  public cellColspanned = false;
  public footerColspanned = false;

  private _ordered = false;

  constructor(colConfig: any = {}, colDefaults: any = false) {
    super();

    this._fromJSON(colConfig);

    this.colStyles = new StyleConfig(colConfig);
    this.mergeWithColumnDefaults(colDefaults);
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
    if (!isObject(defaults)) { defaults = {} }

    ALLOWED_DEFAULTS.forEach((key) => {
      switch (key) {
        case 'title': {
          this.title = this.title || defaults.title;
        } break;

        case 'sortable': {
          if (isBoolean(defaults.sortable)) {
            if (this.sortable === void 0) {
              this.sortable = defaults.sortable;
            }
          }
        } break;

        case 'class': {
          this.headerConfigs.mergeClassByPriority(this.colStyles, defaults.header);
          this.cellConfigs.mergeClassByPriority(this.colStyles, defaults.cell);
          this.footerConfigs.mergeClassByPriority(this.colStyles, defaults.footer);
        } break;

        case 'align': {
          this.headerConfigs.mergeAlignByPriority(this.colStyles, defaults.header);
          this.cellConfigs.mergeAlignByPriority(this.colStyles, defaults.cell);
          this.footerConfigs.mergeAlignByPriority(this.colStyles, defaults.footer);
        } break;
      }
    });

    this.headerConfigs.updateClasesArray();
    this.cellConfigs.updateClasesArray();
    this.footerConfigs.updateClasesArray();
  }

  /**
   * Change sorting direction
   */
  public changeDirection() {
    if (this.sortingDirection === SortingDirection.asc) {
      this.sortingDirection = SortingDirection.desc;
    } else {
      this.sortingDirection = SortingDirection.asc;
    }
  }
}
