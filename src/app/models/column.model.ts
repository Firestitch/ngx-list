import { QueryList, TemplateRef } from '@angular/core';

import { Observable } from 'rxjs';

import { isObject, isBoolean } from 'lodash-es';

import { StyleConfig } from './styleConfig.model';
import { FsListColumnConfig } from '../interfaces/column-config.interface';
import { FsListGroupExpandTriggerDirective } from '../directives/group-expand-trigger/group-expand-trigger.directive';
import { ColumnAttributes } from './column-attributes';

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

export class Column {

  public headerTemplate: TemplateRef<any>;
  public groupCellTemplate: TemplateRef<any>;
  public cellTemplate: TemplateRef<any>;
  public footerTemplate: TemplateRef<any>;
  public expandTrigger: QueryList<FsListGroupExpandTriggerDirective>;

  public headerConfigs: StyleConfig = new StyleConfig();

  public groupCellConfigs: StyleConfig = new StyleConfig();

  public cellConfigs: StyleConfig = new StyleConfig();

  public footerConfigs: StyleConfig = new StyleConfig();

  public colStyles: StyleConfig;

  public headerColspanned = false;
  public groupCellColspanned = false;
  public cellColspanned = false;
  public footerColspanned = false;

  private _attributes: ColumnAttributes;

  private _ordered = false;

  constructor(colConfig: FsListColumnConfig, colDefaults: any = false) {
    this._parseConfig(colConfig);

    this.colStyles = new StyleConfig(colConfig);
    this.mergeWithColumnDefaults(colDefaults);
  }

  public set title(value: string) {
    this._attributes.title = value;
  }

  public get title(): string {
    return this._attributes.title;
  }

  public get name(): string {
    return this._attributes.name;
  }

  public get customize(): boolean {
    return this._attributes.customize;
  }

  public get width(): string {
    return this._attributes.width;
  }

  public set sortable(value: boolean) {
    this._attributes.sortable = value;
  }

  public get sortable(): boolean {
    return this._attributes.sortable;
  }

  public get sortableDefault(): boolean {
    return this._attributes.sortableDefault;
  }

  public set sortingDirection(value: 'asc' | 'desc') {
    this._attributes.direction = value;
  }

  public get sortingDirection(): 'asc' | 'desc' {
    return this._attributes.direction;
  }

  public get visible(): boolean {
    return this._attributes.visible;
  }

  public get visible$(): Observable<boolean> {
    return this._attributes.visible$;
  }

  public get direction() {
    return (this.sortingDirection === SortingDirection.asc) ? 'asc' : 'desc';
  }

  public get fullNameDirection() {
    return (this.sortingDirection === SortingDirection.asc) ? 'Ascending' : 'Descending';
  }

  public get ordered() {
    return this._ordered;
  }

  public set ordered(value) {
    this._ordered = value;

    if (value && !this.sortingDirection) {
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

  public updateVisibility(value: boolean) {
    this._attributes.visible = value;
  }

  private _parseConfig(config: FsListColumnConfig) {
    this._attributes = config.attributes;

    this.headerTemplate = config.headerTemplate;
    this.groupCellTemplate = config.groupCellTemplate;
    this.cellTemplate = config.cellTemplate;
    this.footerTemplate = config.footerTemplate;
    this.headerConfigs = new StyleConfig(config.headerConfigs);
    this.groupCellConfigs = new StyleConfig(config.groupCellConfigs);
    this.cellConfigs = new StyleConfig(config.cellConfigs);
    this.footerConfigs = new StyleConfig(config.footerConfigs);
    this.expandTrigger = config.expandTrigger;
  }
}
