import { QueryList, TemplateRef } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { isBoolean, isObject } from 'lodash-es';

import { FsListGroupExpandTriggerDirective } from '../directives/group-expand-trigger/group-expand-trigger.directive';
import { ListColumnConfig } from '../interfaces/column-config.interface';

import { ColumnAttributes } from './column-attributes';
import { StyleConfig } from './styleConfig.model';

export enum SortingDirection {
  asc = 'asc',
  desc = 'desc'
}

const allowedDefaults = [
  'title',
  'sortable',
  'align',
  'class',
];

export class Column {

  public headerTemplate: TemplateRef<any>;
  public groupHeaderTemplate: TemplateRef<any>;
  public groupFooterTemplate: TemplateRef<any>;
  public cellTemplate: TemplateRef<any>;
  public footerTemplate: TemplateRef<any>;
  public expandTrigger: QueryList<FsListGroupExpandTriggerDirective>;
  public headerConfigs: StyleConfig = new StyleConfig();
  public groupHeaderConfigs: StyleConfig = new StyleConfig();
  public groupFooterConfigs: StyleConfig = new StyleConfig();
  public cellConfigs: StyleConfig = new StyleConfig();
  public footerConfigs: StyleConfig = new StyleConfig();
  public colStyles: StyleConfig;
  public headerColspanned = false;
  public groupHeaderColspanned = false;
  public groupFooterColspanned = false;
  public cellColspanned = false;
  public footerColspanned = false;

  /**
   * Stable identity for `@for (... ; track column.uid)` in the head/body/footer bands.
   * Assigned by ColumnsController as `<setIndex>:<columnIndex>`, so columns from two
   * different sets never collide and a breakpoint swap replaces every cell view.
   */
  public uid = '';

  /**
   * For a column declared inside `<fs-list-breakpoint>`, the same-named column in the
   * base (desktop) set, or null. Base columns leave this null.
   */
  public baseColumn: Column | null = null;

  private _attributes: ColumnAttributes;
  private _defaultDirection: 'asc' | 'desc';
  private _ordered$ = new BehaviorSubject<boolean>(false);

  constructor(
    colConfig: ListColumnConfig, 
    colDefaults: any = false,
  ) {
    this._parseConfig(colConfig);

    this.colStyles = new StyleConfig({
      className: this._attributes.className,
      align: this._attributes.align,
    });

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

  public get customizable(): boolean {
    return this._attributes.customizable;
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

  public get sortingDirection$(): Observable<'asc' | 'desc'> {
    return this._attributes.direction$;
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

  public get ordered$(): Observable<boolean> {
    return this._ordered$.asObservable();
  }

  public get ordered() {
    return this._ordered$.getValue();
  }

  public set ordered(value) {
    if (value && this._ordered$.getValue() !== value) {
      this.sortingDirection = this._defaultDirection ?? SortingDirection.asc;
    }

    this._ordered$.next(value);
  }

  /**
   * The column that owns sort state for this one. A breakpoint column delegates to its
   * same-named base column so `sorting.sortingColumn` is always a base Column -> the
   * `order=<name>,<dir>` query param and the URL stay invariant across a resize.
   * Base columns return themselves, so behaviour is unchanged without breakpoints.
   */
  public get sortSource(): Column {
    return this.baseColumn ?? this;
  }

  /**
   * Whether this column's head cell offers sorting -- the arrow and the click target.
   *
   * Sort *state* delegates to {@link sortSource}, but the affordance must not: a breakpoint
   * column that stacks several base columns into one cell has no honest sort label, and
   * `[sortable]="false"` on a breakpoint column has to be able to drop the control at that
   * width. So a breakpoint column has to declare `sortable` itself, while a base column --
   * whose `sortSource` is itself -- is unaffected.
   */
  public get sortIndicated(): boolean {
    return this.baseColumn ? !!this.sortable : true;
  }

  /**
   * Copy the TemplateRefs of slots this column left undeclared from `base`.
   *
   * Templates only -- never the StyleConfigs. A base `colspan="4"` copied into a
   * 2-column breakpoint set would be bound straight to [attr.colspan] and overflow the
   * row, and sharing a StyleConfig would alias one mutable object across two sets.
   *
   * The header slot is deliberately excluded, template and `title` both. A header labels
   * the column as that set renders it, and a set that stacks five base columns into one
   * cell has no honest label to borrow -- inheriting would print the base column's name
   * over a cell that no longer holds only that value. So the header row is exactly what
   * the active set declares: a set that declares none renders none.
   */
  public inheritTemplatesFrom(base: Column | null): void {
    if (!base) {
      return;
    }

    this.groupHeaderTemplate = this.groupHeaderTemplate ?? base.groupHeaderTemplate;
    this.groupFooterTemplate = this.groupFooterTemplate ?? base.groupFooterTemplate;
    this.cellTemplate = this.cellTemplate ?? base.cellTemplate;
    this.footerTemplate = this.footerTemplate ?? base.footerTemplate;
    this.expandTrigger = this.expandTrigger ?? base.expandTrigger;
  }

  /**
   * Merge with defaults with existing config
   *
   * @param defaults
   */
  public mergeWithColumnDefaults(defaults) {
    if (!isObject(defaults)) {
      defaults = {};
    }

    allowedDefaults
      .forEach((key) => {
        switch (key) {
          case 'title': {
            this.title = this.title || defaults.title;
          } break;

          case 'sortable': {
            if (isBoolean(defaults.sortable)) {
              if (this.sortable === undefined) {
                this.sortable = defaults.sortable;
              }
            }
          } break;

          case 'class': {
            this.headerConfigs.mergeClassByPriority(this.colStyles, defaults.header);
            this.groupHeaderConfigs.mergeClassByPriority(this.colStyles, defaults.cell);
            this.groupFooterConfigs.mergeClassByPriority(this.colStyles, defaults.cell);
            this.cellConfigs.mergeClassByPriority(this.colStyles, defaults.cell);
            this.footerConfigs.mergeClassByPriority(this.colStyles, defaults.footer);
          } break;

          case 'align': {
            this.headerConfigs.mergeAlignByPriority(this.colStyles, defaults.header);
            this.groupHeaderConfigs.mergeAlignByPriority(this.colStyles, defaults.cell);
            this.groupFooterConfigs.mergeAlignByPriority(this.colStyles, defaults.cell);
            this.cellConfigs.mergeAlignByPriority(this.colStyles, defaults.cell);
            this.footerConfigs.mergeAlignByPriority(this.colStyles, defaults.footer);
          } break;
        }
      });

    this.headerConfigs.updateClasesArray();
    this.groupHeaderConfigs.updateClasesArray();
    this.groupFooterConfigs.updateClasesArray();
    this.cellConfigs.updateClasesArray();
    this.footerConfigs.updateClasesArray();
  }

  /**
   * Change sorting direction
   */
  public changeDirection() {
    this.sortingDirection = this.sortingDirection === SortingDirection.asc ? SortingDirection.desc : SortingDirection.asc;
  }

  public updateVisibility(value: boolean) {
    this._attributes.visible = value;
  }

  public updateCustomizable(value: boolean) {
    this._attributes.customizable = value;
  }

  private _parseConfig(config: ListColumnConfig) {
    this._attributes = config.attributes;

    this.headerTemplate = config.headerTemplate;
    this.groupHeaderTemplate = config.groupHeaderTemplate;
    this.groupFooterTemplate = config.groupFooterTemplate;
    this.cellTemplate = config.cellTemplate;
    this.footerTemplate = config.footerTemplate;
    this.headerConfigs = new StyleConfig(config.headerConfigs);
    this.groupHeaderConfigs = new StyleConfig(config.groupHeaderConfigs);
    this.groupFooterConfigs = new StyleConfig(config.groupFooterConfigs);
    this.cellConfigs = new StyleConfig(config.cellConfigs);
    this.footerConfigs = new StyleConfig(config.footerConfigs);
    this.expandTrigger = config.expandTrigger;
    this._defaultDirection = config.attributes.direction;
  }
}
