import { isNumber } from 'lodash-es';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { skip, takeUntil, tap } from 'rxjs/operators';

import { Column } from '../models/column.model';
import {
  FsListColumnChangeFn,
  FsListColumnConfig,
  FsListColumnDisabledFn,
  FsListColumnLoadFn,
  FsListColumnTitleFn,
  FsListColumnTooltipFn,
} from '../interfaces/listconfig.interface';


export class ColumnsController {

  private _visibleColumns$ = new BehaviorSubject<Column[]>([]);
  private _visibleColumnsShared$ = this._visibleColumns$.pipe();
  private _theadClass = '';
  private _loadFn: FsListColumnLoadFn;
  private _changeFn: FsListColumnChangeFn;
  private _customizeFieldTitleFn: FsListColumnTitleFn;
  private _customizeFieldDisabledFn: FsListColumnDisabledFn;
  private _columnTooltipFn: FsListColumnTooltipFn;

  private _isConfigured = false;
  private _loadFnConfigured = false;
  private _changeFnConfigured = false;
  private _columnsFetched = false;
  private _hasHeader = false;
  private _hasFooter = false;
  private _columns: Column[] = [];
  private _defaultConfigs;

  private _columnsUpdated$ = new Subject<void>();
  private _destroy$ = new Subject<void>();

  constructor() {}

  public get columns() {
    return this._columns.slice();
  }

  public get visibleColumns(): Column[] {
    return this._visibleColumns$.getValue();
  }

  public get visibleColumns$(): Observable<Column[]> {
    return this._visibleColumnsShared$;
  }

  public get columnsForDialog() {
    const hasCustomTitle = !!this._customizeFieldTitleFn;
    const hasCustomDisabledStatus = !!this._customizeFieldDisabledFn;
    const hasCustomTooltip = !!this._columnTooltipFn;

    return this._columns
      .filter((column) => column.customize && !!column.name)
      .map((column) => {
        const title = hasCustomTitle
          ? this._customizeFieldTitleFn(column.name, column.title)
          : column.name;

        const disabled = hasCustomDisabledStatus
          ? this._customizeFieldDisabledFn(column.name)
          : false;

        const tooltip = hasCustomTooltip
          ? this._columnTooltipFn(column.name, column.visible, disabled)
          : void 0;

        return {
          template: column.headerTemplate,
          name: column.name,
          show: column.visible,
          title: title,
          disabled: disabled,
          tooltip: tooltip,
        }
      });
  }

  public get columnsFetched() {
    return this._columnsFetched;
  }

  public get hasHeader() {
    return this._hasHeader;
  }

  public get hasFooter() {
    return this._hasFooter;
  }

  public get theadClass() {
    return this._theadClass;
  }

  public get configured() {
    return this._isConfigured;
  }

  public get loadFnConfigured() {
    return this._loadFnConfigured;
  }

  public get changeFnConfigured() {
    return this._changeFnConfigured;
  }

  public get changeFn() {
    return this._changeFn;
  }

  public get visibleColumnsNames() {
    return this.visibleColumns
      .map((column) => column.name)
      .filter((name) => !!name);
  }

  public setDefaults(defaults) {
    this._defaultConfigs = defaults;
  }

  /**
   * Set data from list config
   * @param config
   */
  public initConfig(config: FsListColumnConfig) {
    if (config) {
      if (config.load) {
        this._loadFn = config.load;
        this._loadFnConfigured = true;
      }

      if (config.change) {
        this._changeFn = config.change;
        this._changeFnConfigured = true;
      }

      if (config.title) {
        this._customizeFieldTitleFn = config.title;
      }

      if (config.disabled) {
        this._customizeFieldDisabledFn = config.disabled;
      }

      if (config.tooltip) {
        this._columnTooltipFn = config.tooltip;
      }

      this._isConfigured = true;
    }
  }

  /**
   * Base initialization for columns
   * @param templates
   */
  public initializeColumns(templates) {
    this._columns = [];

    templates.forEach((column) => {
      const col = new Column(column, this._defaultConfigs);


      if (col.headerTemplate || col.title) {
        this._hasHeader = true;
      }
      if (col.footerTemplate) {
        this._hasFooter = true;
      }

      this._columns.push(col);
    });

    this._theadClass = this.hasHeader ? 'has-header' : '';

    this._updateColspans('headerConfigs', 'headerColspanned');
    this._updateColspans('groupCellConfigs', 'groupCellColspanned');
    this._updateColspans('cellConfigs', 'cellColspanned');
    this._updateColspans('footerConfigs', 'footerColspanned');

    this.updateVisibleColumns();
    this._listenColumnVisibilityUpdates();
  }

  /**
   * Load visiblity config for columns from remote
   */
  public loadRemoteColumnConfigs() {
    return this._loadFn()
      .pipe(
        takeUntil(this._destroy$),
        tap((columnConfigs) => {
          this._columnsFetched = true;
          this.updateVisibilityForCols(columnConfigs);
        })
      )
  }

  /**
   * Set visible columns based on current columns show status
   */
  public updateVisibleColumns() {
    this._visibleColumns$.next(
      this._columns.filter((column) => column.visible) || []
    );
  }

  /**
   * Update visibility based on passed config
   * @param columnsConfig
   */
  public updateVisibilityForCols(columnsConfig) {
    columnsConfig.forEach((columnConfig) => {
      const col = this._columns
        .find((column) => column.name === columnConfig.name);

      if (col) {
        col.updateVisibility(columnConfig.show);
      }
    });

    this.updateVisibleColumns();
  }

  public destroy() {
    this._destroy$.next();
    this._destroy$.complete();
    this._columnsUpdated$.complete();

    this._columns = void 0;
    this._visibleColumns$ = void 0;
    this._defaultConfigs = void 0;

    this._loadFn = void 0;
    this._changeFn = void 0;
  }

  private _listenColumnVisibilityUpdates() {
    this._columnsUpdated$.next();

    const columnsVisibility = this._columns.map((column) => {
      return column.visible$.pipe(skip(1))
    });

    merge(...columnsVisibility)
      .pipe(
        takeUntil(this._columnsUpdated$),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.updateVisibleColumns();
      })
  }

  private _updateColspans(config, updateFlag) {
    this._columns.forEach((col, index) => {

      if (col[config].colspan !== void 0) {
        const spanTo = index + +col[config].colspan;

        if (!isNumber(spanTo)) {
          return;
        }
        this._columns[index][updateFlag] = false;

        for (let i = index + 1; i < spanTo; i++) {
          if (this._columns[i]) {
            this._columns[i][updateFlag] = true;
          }
        }
      }
    })
  }

}
