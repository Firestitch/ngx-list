import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { skip, takeUntil, tap } from 'rxjs/operators';

import { isNumber } from 'lodash-es';

import {
  FsListColumn,
  FsListColumnChangeFn,
  FsListColumnConfig,
  FsListColumnLoadFn,
} from '../interfaces';
import { ColumnsColumn } from '../models';
import { Column } from '../models/column.model';

import { PersistanceController } from './persistance-controller';


export class ColumnsController {

  private _visibleColumns$ = new BehaviorSubject<Column[]>([]);
  private _visibleColumnsShared$ = this._visibleColumns$.pipe();
  private _theadClass = '';
  private _loadFn: FsListColumnLoadFn;
  private _changeFn: FsListColumnChangeFn;
  private _initFn: FsListColumnChangeFn;
  private _isConfigured = false;
  private _columnsFetched = false;
  private _hasHeader = false;
  private _hasFooter = false;
  private _columns: Column[] = [];
  private _defaultConfigs;
  private _columnsUpdated$ = new Subject<void>();
  private _destroy$ = new Subject<void>();

  constructor(
    private _persistance: PersistanceController,
  ) {}

  public get columns() {
    return this._columns.slice();
  }

  public get visibleColumns(): Column[] {
    return this._visibleColumns$.getValue();
  }

  public get visibleColumns$(): Observable<Column[]> {
    return this._visibleColumnsShared$;
  }

  public get columnsForDialog(): ColumnsColumn[] {
    return this._columns
      .filter((column) => column.customizable && !!column.name)
      .map((column) => {
        return {
          template: column.headerTemplate,
          name: column.name,
          show: column.visible,
          title: column.title,
        };
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
    this._loadFn = config?.load ? config.load : () => {
      return of(this._persistance.columnsEnabled ? this._persistance.getColumns() : []);
    };
      
    this._changeFn = config?.change ? config.change : () => {
      //
    };

    this._initFn = config?.init ? config.init : () => {
      //
    };

    this._isConfigured = !!config;
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
    this._updateColspans('groupHeaderConfigs', 'groupHeaderColspanned');
    this._updateColspans('groupFooterConfigs', 'groupFooterColspanned');
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
        tap((columns: FsListColumn[]) => {
          this._columnsFetched = true;
          this.updateVisibilityForCols(columns);
          this.updateCustomizableForCols(columns);
          this._initFn(
            this._columns
              .filter((column) => column.customizable && !!column.name)
              .map<FsListColumn>((column) => {
                return {
                  name: column.name,
                  show: column.visible,
                };
              }));
        }),
        takeUntil(this._destroy$),
      );
  }

  /**
   * Set visible columns based on current columns show status
   */
  public updateVisibleColumns() {
    this._visibleColumns$.next(
      this._columns.filter((column) => column.visible) || [],
    );
  }

  /**
   * Update visibility based on passed config
   * @param columnsConfig
   */
  public updateVisibilityForCols(columnsConfig: FsListColumn[]) {
    columnsConfig.forEach((columnConfig) => {
      const col = this._columns
        .find((column) => column.name === columnConfig.name);

      if (col) {
        col.updateVisibility(columnConfig.show ?? true);
      }
    });

    this.updateVisibleColumns();
  }

  public updateCustomizableForCols(columnsConfig: FsListColumn[]) {
    columnsConfig.forEach((columnConfig) => {
      const col = this._columns
        .find((column) => column.name === columnConfig.name);

      if (col) {
        col.updateCustomizable(columnConfig.customizable ?? true);
      }
    });
  }

  public destroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
    this._columnsUpdated$.complete();

    this._columns = undefined;
    this._visibleColumns$ = undefined;
    this._defaultConfigs = undefined;

    this._loadFn = undefined;
    this._changeFn = undefined;
    this._initFn = undefined;
  }

  private _listenColumnVisibilityUpdates() {
    this._columnsUpdated$.next(null);

    const columnsVisibility = this._columns.map((column) => {
      return column.visible$.pipe(skip(1));
    });

    merge(...columnsVisibility)
      .pipe(
        takeUntil(this._columnsUpdated$),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.updateVisibleColumns();
      });
  }

  private _updateColspans(config, updateFlag) {
    this._columns.forEach((col, index) => {

      if (col[config].colspan !== undefined) {
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
    });
  }

}
