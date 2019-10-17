import { isNumber } from 'lodash-es';
import { Subject } from 'rxjs';

import { Column } from '../models/column.model';
import {
  FsListColumnChangeFn,
  FsListColumnConfig,
  FsListColumnLoadFn
} from '../interfaces/listconfig.interface';
import { takeUntil } from 'rxjs/operators';


export class ColumnsController {

  public visibleColumns: Column[] = [];

  private _theadClass = '';
  private _loadFn: FsListColumnLoadFn;
  private _changeFn: FsListColumnChangeFn;

  private _isConfigured = false;
  private _hasHeader = false;
  private _hasFooter = false;
  private _columns: Column[] = [];
  private _defaultConfigs;

  private _destroy$ = new Subject<void>();

  constructor() {}

  public get columns() {
    return this._columns.slice();
  }

  public get sortableColumns() {
    return this._columns.filter((column) => column.sortable);
  }

  public get columnsForDialog() {
    return this._columns.map((column) => {
      return {
        template: column.headerTemplate,
        name: column.name,
        show: column.show,
        title: column.title,
      }
    })
      .filter((column) => !!column.name);
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
      this._loadFn = config.load;
      this._changeFn = config.change;

      this._isConfigured = true;
    }
  }

  /**
   * Base initialization for columns
   * @param templates
   */
  public initializeColumns(templates) {
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

    if (this.configured) {
      this.loadRemoteColumnConfigs();
    } else {
      this.updateVisibleColumns();
    }
  }

  /**
   * Load visiblity config for columns from remote
   */
  public loadRemoteColumnConfigs() {
    this._loadFn()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((columnConfigs) => {
        this.updateVisibilityForCols(columnConfigs);
      })
  }

  /**
   * Call change callback function if specified
   */
  public saveChangesRemote() {
    if (this._changeFn) {
      const data = this.columns
        .filter((column) => !!column.name)
        .map((column) => {
          return {
            name: column.name,
            show: column.show,
          }
        });

      this._changeFn(data);
    }
  }

  /**
   * Set visible columns based on current columns show status
   */
  public updateVisibleColumns() {
    this.visibleColumns =
      this._columns.filter((column) => column.show) || [];
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
        col.show = columnConfig.show;
      }
    });

    this.updateVisibleColumns();
  }

  public destroy() {
    this._destroy$.next();
    this._destroy$.complete();

    this._columns = void 0;
    this.visibleColumns = void 0;
    this._defaultConfigs = void 0;

    this._loadFn = void 0;
    this._changeFn = void 0;
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
