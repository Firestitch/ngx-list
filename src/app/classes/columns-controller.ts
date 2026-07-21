import { isDevMode } from '@angular/core';

import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs';
import { skip, takeUntil, tap } from 'rxjs/operators';

import { FsListBreakpointDirective } from '../directives/breakpoint/breakpoint.directive';
import {
  FsListColumn,
  FsListColumnChangeFn,
  FsListColumnConfig,
  FsListColumnLoadFn,
} from '../interfaces';
import { ColumnsColumn } from '../models';
import { ColumnSet } from '../models/column-set.model';
import { Column } from '../models/column.model';

import { BreakpointController } from './breakpoint-controller';
import { PersistanceController } from './persistance-controller';


export class ColumnsController {

  private _visibleColumns$ = new BehaviorSubject<Column[]>([]);
  private _visibleColumnsShared$ = this._visibleColumns$.asObservable();

  /**
   * The columns the three bands actually render -- the active set's visible columns.
   * Cached in a field, never a getter: AsyncPipe re-subscribes whenever the observable
   * identity changes, and `asObservable()` returns a new instance per call.
   */
  private _renderedColumns$ = new BehaviorSubject<Column[]>([]);
  private _renderedColumnsShared$ = this._renderedColumns$.asObservable();

  private _activeSet$ = new BehaviorSubject<ColumnSet>(null);
  private _activeSetShared$ = this._activeSet$.asObservable();

  private _sets: ColumnSet[] = [];
  private _base: ColumnSet = new ColumnSet(null);
  private _active: ColumnSet = this._base;

  private _loadFn: FsListColumnLoadFn;
  private _changeFn: FsListColumnChangeFn;
  private _initFn: FsListColumnChangeFn;
  private _isConfigured = false;
  private _columnsFetched = false;
  private _defaultConfigs;
  private _batching = false;
  private _columnsUpdated$ = new Subject<void>();
  private _destroy$ = new Subject<void>();

  constructor(
    private _persistance: PersistanceController,
    private _breakpoints?: BreakpointController,
  ) {}

  /**
   * The base (desktop) set. Unchanged meaning: persistence, the customize dialog and the
   * `columns` fetch param all stay viewport-independent because they read this.
   */
  public get columns() {
    return this._base.columns.slice();
  }

  public get visibleColumns(): Column[] {
    return this._base.rendered;
  }

  public get visibleColumns$(): Observable<Column[]> {
    return this._visibleColumnsShared$;
  }

  /** The active set's visible columns -- what `<thead>`/`<tbody>`/`<tfoot>` iterate. */
  public get renderedColumns(): Column[] {
    return this._active.rendered;
  }

  public get renderedColumns$(): Observable<Column[]> {
    return this._renderedColumnsShared$;
  }

  public get activeSet(): ColumnSet {
    return this._active;
  }

  public get activeSet$(): Observable<ColumnSet> {
    return this._activeSetShared$;
  }

  /** The `maxWidth` of every declared breakpoint set, ascending. */
  public get breakpoints(): number[] {
    return this._sets
      .filter((set) => !set.isBase)
      .map((set) => set.maxWidth);
  }

  public get columnsForDialog(): ColumnsColumn[] {
    return this._base.columns
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
    return this._active.hasHeader;
  }

  public get hasFooter() {
    return this._active.hasFooter;
  }

  /** Follows the active set: a breakpoint set that declares no headers is not `has-header`. */
  public get theadClass() {
    return this._active?.hasHeader ? 'has-header' : '';
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
   *
   * @param templates base (desktop) column directives
   * @param breakpointDirectives `<fs-list-breakpoint>` directives, each declaring one set
   */
  public initializeColumns(
    templates,
    breakpointDirectives: FsListBreakpointDirective[] = [],
  ) {
    this._base = this._buildSet(new ColumnSet(null), templates);

    const breakpointSets = (breakpointDirectives || [])
      .filter((directive) => Number.isFinite(directive?.maxWidth))
      .map((directive) => {
        const set = new ColumnSet(directive.maxWidth);

        set.selection = directive.selection;
        set.rowActions = directive.rowActions;
        set.reorder = directive.reorder;

        return this._buildSet(set, directive.columnDirectives?.toArray() ?? []);
      })
      .sort((a, b) => a.maxWidth - b.maxWidth);

    this._sets = [...breakpointSets, this._base];

    this._sets.forEach((set, setIndex) => {
      set.columns.forEach((column, index) => {
        column.uid = `${setIndex}:${index}`;
      });

      set.resolve();
    });

    // Tear down subscriptions from a previous initializeColumns before re-subscribing.
    this._columnsUpdated$.next(null);

    // Apply whatever breakpoint is already active before the first emission, so the
    // initial paint uses the right set rather than flashing the desktop columns.
    this._active = this._base;
    this._listenBreakpointChanges();
    this._applyActiveSet(this._breakpoints?.active ?? null);

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
            this._base.columns
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
    if (this._batching) {
      return;
    }

    this._sets.forEach((set) => set.update());

    this._visibleColumns$.next(this._base.rendered);
    this._renderedColumns$.next(this._active.rendered);
  }

  /**
   * Switch to the set registered for `maxWidth`, or the base set when null.
   */
  public setActiveBreakpoint(maxWidth: number | null): void {
    if (this._applyActiveSet(maxWidth)) {
      this.updateVisibleColumns();
    }
  }

  /**
   * Update visibility based on passed config.
   *
   * Applies to every set that declares a column of that name, so hiding a column in the
   * customize dialog hides it at every width.
   *
   * @param columnsConfig
   */
  public updateVisibilityForCols(columnsConfig: FsListColumn[]) {
    this._batching = true;

    try {
      columnsConfig.forEach((columnConfig) => {
        this._columnsNamed(columnConfig.name)
          .forEach((column) => column.updateVisibility(columnConfig.show ?? true));
      });
    } finally {
      this._batching = false;
    }

    this.updateVisibleColumns();
  }

  public updateCustomizableForCols(columnsConfig: FsListColumn[]) {
    columnsConfig.forEach((columnConfig) => {
      this._columnsNamed(columnConfig.name)
        .forEach((column) => column.updateCustomizable(columnConfig.customizable ?? true));
    });
  }

  public destroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
    this._columnsUpdated$.complete();
    this._renderedColumns$.complete();
    this._activeSet$.complete();

    this._sets = undefined;
    this._base = undefined;
    this._active = undefined;
    this._visibleColumns$ = undefined;
    this._defaultConfigs = undefined;

    this._loadFn = undefined;
    this._changeFn = undefined;
    this._initFn = undefined;
  }

  private _buildSet(set: ColumnSet, templates): ColumnSet {
    (templates || []).forEach((template) => {
      const column = new Column(template, this._defaultConfigs);

      if (!set.isBase) {
        column.baseColumn = column.name
          ? this._base.columns.find((base) => base.name === column.name) ?? null
          : null;

        if (isDevMode() && column.name && !column.baseColumn) {
          console.warn(
            `[fs-list-breakpoint] Column "${column.name}" has no column of that name in ` +
            'the base set, so it cannot inherit templates or sorting from one.',
          );
        }

        column.inheritTemplatesFrom(column.baseColumn);
      }

      set.columns.push(column);
    });

    return set;
  }

  /** Every column of a given name, across every set. */
  private _columnsNamed(name: string): Column[] {
    return this._sets
      .reduce<Column[]>((acc, set) => {
        const column = set.columns.find((item) => item.name === name);

        return column ? [...acc, column] : acc;
      }, []);
  }

  /**
   * @returns whether the active set actually changed
   */
  private _applyActiveSet(maxWidth: number | null): boolean {
    let next = this._sets.find((set) => set.maxWidth === maxWidth) ?? this._base;

    next.update();

    // A set that renders nothing would produce an empty table. Fall back to base.
    if (!next.isBase && !next.rendered.length) {
      next = this._base;
    }

    if (next === this._active) {
      return false;
    }

    this._active = next;
    this._activeSet$.next(next);

    return true;
  }

  private _listenBreakpointChanges(): void {
    if (!this._breakpoints) {
      return;
    }

    this._breakpoints.setBreakpoints(this.breakpoints);

    this._breakpoints.active$
      .pipe(
        skip(1),
        takeUntil(this._columnsUpdated$),
        takeUntil(this._destroy$),
      )
      .subscribe((maxWidth) => {
        this.setActiveBreakpoint(maxWidth);
      });
  }

  private _listenColumnVisibilityUpdates() {
    const columnsVisibility = this._sets
      .reduce<Column[]>((acc, set) => [...acc, ...set.columns], [])
      .map((column) => {
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

}
