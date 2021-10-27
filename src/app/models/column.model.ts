import { TemplateRef } from '@angular/core';

import { Alias, Model } from 'tsmodels';

import { isObject, isBoolean } from 'lodash-es';

import { StyleConfig } from './styleConfig.model';

export enum SortingDirection {
  asc = 'asc',
  desc = 'desc'
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
  @Alias() public show: boolean;
  @Alias() public customize: boolean;
  @Alias() public width: string;
  @Alias() public sortable: boolean;
  @Alias() public sortableDefault: boolean;
  @Alias() public headerTemplate: TemplateRef<any>;
  @Alias() public groupCellTemplate: TemplateRef<any>;
  @Alias() public cellTemplate: TemplateRef<any>;
  @Alias() public footerTemplate: TemplateRef<any>;
  @Alias() public expandTrigger: TemplateRef<any>;
  @Alias() public superTriger: TemplateRef<any>;

  @Alias('headerConfigs', StyleConfig)
  public headerConfigs: StyleConfig = new StyleConfig();

  @Alias('groupCellConfigs', StyleConfig)
  public groupCellConfigs: StyleConfig = new StyleConfig();

  @Alias('cellConfigs', StyleConfig)
  public cellConfigs: StyleConfig = new StyleConfig();

  @Alias('footerConfigs', StyleConfig)
  public footerConfigs: StyleConfig = new StyleConfig();

  public colStyles: StyleConfig;

  @Alias('direction')
  public sortingDirection: SortingDirection;

  public headerColspanned = false;
  public groupCellColspanned = false;
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
    return (this.sortingDirection === SortingDirection.asc) ? 'Ascending' : 'Descending';
  }

  get ordered() {
    return this._ordered;
  }

  set ordered(value) {
    this._ordered = value;

    if (value && !this.sortingDirection) {
      this.sortingDirection = SortingDirection.asc;
    }
  }

  public _fromJSON(value: any) {
    super._fromJSON(value);

    if (this.sortableDefault) {
      this.sortable = true;
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
          this.groupCellConfigs.mergeClassByPriority(this.colStyles, defaults.cell);
          this.cellConfigs.mergeClassByPriority(this.colStyles, defaults.cell);
          this.footerConfigs.mergeClassByPriority(this.colStyles, defaults.footer);
        } break;

        case 'align': {
          this.headerConfigs.mergeAlignByPriority(this.colStyles, defaults.header);
          this.groupCellConfigs.mergeAlignByPriority(this.colStyles, defaults.cell);
          this.cellConfigs.mergeAlignByPriority(this.colStyles, defaults.cell);
          this.footerConfigs.mergeAlignByPriority(this.colStyles, defaults.footer);
        } break;
      }
    });

    this.headerConfigs.updateClasesArray();
    this.groupCellConfigs.updateClasesArray();
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
