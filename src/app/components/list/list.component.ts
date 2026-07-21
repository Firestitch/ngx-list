import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, Injector, Input, OnDestroy, OnInit, Output, QueryList, TemplateRef, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { DrawerRef } from '@firestitch/drawer';
import { FilterComponent, FilterHeadingDirective, FilterStatusBarDirective } from '@firestitch/filter';
import { SelectionDialog } from '@firestitch/selection';

import { Observable, Subject } from 'rxjs';
import { delay, filter, skip, take, takeUntil } from 'rxjs/operators';

import { cloneDeep, mergeWith } from 'lodash-es';

import { BreakpointController } from '../../classes/breakpoint-controller';
import { List } from '../../classes/list-controller';
import { PersistanceController } from '../../classes/persistance-controller';
import { ReorderController } from '../../classes/reorder-controller';
import { SelectionController } from '../../classes/selection-controller';
import {
  FsListHeadingDirective,
} from '../../directives';
import { FsListBreakpointDirective } from '../../directives/breakpoint/breakpoint.directive';
import { FsListCellDirective } from '../../directives/cell/cell.directive';
import { FsListColumnDirective } from '../../directives/column/column.directive';
import { FsListContentInitDirective } from '../../directives/content-init/content-init.directive';
import { FsListDraggableListDirective } from '../../directives/draggable-list/draggable-list.directive';
import { FsListEmptyStateDirective } from '../../directives/empty-state/empty-state.directive';
import { FsListFooterDirective } from '../../directives/footer/footer.directive';
import { PaginationStrategy } from '../../enums/pagination-strategy.enum';
import { FS_LIST_CONFIG } from '../../fs-list.providers';
import {
  FsListAbstractRow,
  FsListAction,
  FsListConfig, FsListPersitance, FsListSelectionConfig,
  FsListTrackByFn,
  FsListTrackByTargetRowFn,
} from '../../interfaces';
import { IPaginationState } from '../../interfaces/pagination-state.interface';
import { Column, Row } from '../../models';
import { GroupExpandNotifierService } from '../../services/group-expand-notifier.service';
import { FsBodyComponent } from '../body/body.component';
import { CustomizeColsDialogComponent } from '../customize-cols';
import { FsFooterComponent } from '../footer/footer.component';
import { FsHeadComponent } from '../head/head.component';
import { FsListLoaderComponent } from '../loader/loader.component';
import { FsPaginationComponent } from '../pagination/pagination.component';
import { FsStatusComponent } from '../status/status.component';


@Component({
  selector: 'fs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    GroupExpandNotifierService,
    PersistanceController,
    ReorderController,
    BreakpointController,
  ],
  standalone: true,
  imports: [
    NgClass,
    NgTemplateOutlet,
    FilterComponent,
    FilterStatusBarDirective,
    FilterHeadingDirective,
    FsStatusComponent,
    FsListContentInitDirective,
    FsHeadComponent,
    FsBodyComponent,
    FsListDraggableListDirective,
    FsFooterComponent,
    FsListFooterDirective,
    FsListLoaderComponent,
    FsPaginationComponent,
    AsyncPipe,
  ],
})
export class FsListComponent<TRow = any> implements OnInit, OnDestroy, AfterContentInit {
  
  public reorderController = inject(ReorderController);

  @HostBinding('class.fs-list') public classFsList = true;

  @HostBinding('class.fs-list-row-highlight')
  public rowHoverHighlight: boolean;

  @Input('config')
  public set config(config: FsListConfig<TRow>) {
    this._initWithConfig(config);
  }

  @Input()
  public loaderLines = 3;

  private _cellRowTypeInput?: unknown;
  private _cellRowTypeFromConfig?: unknown;

  /**
   * Row typing anchor for cell templates. Overrides {@link FsListConfig.cellRowType}.
   * Copied onto each `fs-list-cell` (and group cell templates) unless `[rowType]` is set on that cell.
   */
  @Input()
  public set cellRowType(value: unknown) {
    this._cellRowTypeInput = value;
    this._propagateCellRowTypeAnchors();
  }

  public get cellRowType(): unknown {
    return this._cellRowTypeInput !== undefined ? this._cellRowTypeInput : this._cellRowTypeFromConfig;
  }

  /** Merged config after defaults; used to type cells without per-template `[configTyping]`. */
  public get mergedListConfig(): FsListConfig<TRow> | undefined {
    return this._mergedListConfig as FsListConfig<TRow> | undefined;
  }

  @Output()
  public filtersReady = new EventEmitter<void>();

  @ContentChild(FsListHeadingDirective, { read: TemplateRef })
  public headingTemplate: TemplateRef<any>;

  @ViewChild(FsBodyComponent)
  public body: FsBodyComponent;

  public list: List;

  // Event will fired if action remove: true will clicked
  public rowRemoved = new EventEmitter();
  public firstLoad = true;

  private _contentInitialized = false;
  /** Merged list config (after defaults); used to populate cell `configTyping` when cells omit it. */
  private _mergedListConfig?: FsListConfig<TRow>;
  private _filterRef: FilterComponent;
  private _filterParamsReady = false;
  private _destroy = new Subject();
  private _injector = inject(Injector);
  private _config = inject<FsListConfig>(FS_LIST_CONFIG, { optional: true });
  private _el = inject(ElementRef);
  private _selectionDialog = inject(SelectionDialog);
  private _dialog = inject(MatDialog);
  private _cdRef = inject(ChangeDetectorRef);
  private _groupExpandNotifier = inject(GroupExpandNotifierService);
  private _route = inject(ActivatedRoute);
  private _persistance = inject(PersistanceController);
  private _breakpoints = inject(BreakpointController);

  @ViewChild(FilterComponent)
  public set filterReference(component) {
    this._filterRef = component;
    this.list.actions.setFilterRef(component);
    this._emitFiltersReadyEvent();
  }

  /**
   * Base (desktop) columns. Columns declared inside `<fs-list-breakpoint>` are excluded
   * automatically: this query is `descendants: false`, and Angular only walks up through
   * `<ng-container>` nodes, so a real `<fs-list-breakpoint>` element blocks it.
   *
   * Consumed from `_rebuildColumns()`, never from a setter -- `refreshContentQueries`
   * populates queries in directive-creation order, so `<fs-list>`'s query resolves before
   * `<fs-list-breakpoint>`'s and the breakpoint sets would still be undefined here.
   */
  @ContentChildren(FsListColumnDirective)
  public columnTemplates: QueryList<FsListColumnDirective>;

  /** Alternate column sets, each active at its own `maxWidth` and below. */
  @ContentChildren(FsListBreakpointDirective)
  public breakpointDirectives: QueryList<FsListBreakpointDirective>;

  @ContentChild(FsListEmptyStateDirective, { read: TemplateRef })
  private set _emptyStateTemplate(template: TemplateRef<any>) {
    if (this.list) {
      this.list.emptyStateTemplate = template;
    }
  }

  private _dialogRef = inject(MatDialogRef, { optional: true });
  private _drawerRef = inject(DrawerRef, { optional: true });

  /**
   * Return reference for filter
   */
  public get filterRef(): FilterComponent {
    return this._filterRef;
  }

  public set groupEnabled(value: boolean) {
    this.list.groupEnabled(value);
  }

  public get groupEnabled() {
    return this.list.dataController.groupEnabled;
  }

  public get hasStatus() {
    return this.list.status &&
      (this.list.sorting.isDefined || this.list.paging.enabled) &&
      (
        !this.reorderController.enabled ||
        (this.reorderController.enabled && this.reorderController.status)
      );
  }

  public get paginatorVisible(): boolean {
    return this.list.paging.enabled
      && !this.firstLoad
      && !this.list.emptyStateEnabled
      && this.list.dataController.visibleRowsCount > 0
      && this.list.paging.pages > 1;
  }

  public get filtersQuery(): Record<string, unknown> {
    return this.list.filtersQuery;
  }

  public get pagingState(): IPaginationState {
    return this.list.paging.state;
  }

  public ngAfterContentInit(): void {
    this._contentInitialized = true;
    this._rebuildColumns();

    this.columnTemplates.changes
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this._rebuildColumns());

    this.breakpointDirectives.changes
      .pipe(takeUntil(this._destroy))
      .subscribe(() => this._rebuildColumns());

    if (this.list.afterInit) {
      this.list.afterInit(this);
    }
  }

  /**
   * Build every column set from the content queries. Safe to call repeatedly; the only
   * entry point that touches columns.
   */
  private _rebuildColumns(): void {
    if (!this.list || !this._contentInitialized || !this.columnTemplates) {
      return;
    }

    this.list.tranformTemplatesToColumns(
      this.columnTemplates,
      this.breakpointDirectives?.toArray() ?? [],
    );

    this._propagateCellRowTypeAnchors();
    this._cdRef.markForCheck();
  }

  public ngOnInit() {
    this._subscribeToRemoveRow();
    this._subscribeToGroupExpandStatusChange();
  }

  public ngOnDestroy() {
    if (this.list) {
      this.list.destroy();
    }

    this._destroy.next(null);
    this._destroy.complete();
  }

  public nextPage() {
    this.list.paging.goNext();
  }

  public prevPage() {
    this.list.paging.goPrev();
  }

  public firstPage() {
    this.list.paging.goFirst();
  }

  public lastPage() {
    this.list.paging.goLast();
  }

  public reload(): Observable<{ scrollIntoView?: boolean }> {
    this.filterRef.reload();

    return this.list.fetchComplete$
      .pipe(      
        take(1),  
        delay(0),
      );
  }

  public getData(trackBy?: FsListTrackByFn) {
    return this.list.getData(trackBy);
  }

  public hasData(trackBy: FsListTrackByFn) {
    return this.list.hasData(trackBy);
  }

  public updateData(
    rows: FsListAbstractRow | FsListAbstractRow[],
    trackBy?: FsListTrackByTargetRowFn,
  ): boolean {
    return this.list.dataController.updateData(rows, trackBy);
  }

  public updateSelectionConfig(config: FsListSelectionConfig) {
    this.list.selection.updateConfig(config);
  }

  public resetSelectionActions() {
    this.list.selection.resetActions();
  }

  public enableSelection() {
    this.list.selection.enableSelection();
  }

  public disableSelection() {
    this.list.selection.disableSelection();
  }

  public removeData(data: FsListAbstractRow | FsListAbstractRow[] | FsListTrackByTargetRowFn): boolean {
    return this.list.dataController.removeData(data);
  }

  public setHeading(heading: string) {
    this.list.heading = heading;
  }

  public setSubheading(subheading: string) {
    this.list.subheading = subheading;
  }

  public reorderStart() {
    this.reorderController.enableReorder();
  }

  public reorderFinish() {
    this.reorderController.disableReorder();
  }

  public setActions(actions: FsListAction[]) {
    if (actions) {
      this.list.actions.clearActions();
      this.list.actions.setActions(actions);
    }
  }

  public filterReady() {
    this.list.filtersReady();
    this._filterParamsReady = true;
    this._emitFiltersReadyEvent();
  }

  /**
   * Update visibility for specific column
   */
  public columnVisibility(name: string, show: boolean) {
    this.columnsVisibility([{ name, show }]);
  }

  /**
   * Update visibility for list of specific columns
   */
  public columnsVisibility(columns: { name: string; show: boolean }[]) {
    this.list.columns.updateVisibilityForCols(columns);
  }

  public get visibleColumns$(): Observable<Column[]> {
    return this.list.columns.visibleColumns$;
  }

  /**
   * The columns actually being rendered -- the active breakpoint set's visible columns.
   * Equal to {@link visibleColumns$} when no `<fs-list-breakpoint>` is declared.
   */
  public get renderedColumns$(): Observable<Column[]> {
    return this.list.columns.renderedColumns$;
  }

  /** `maxWidth` of the active breakpoint set, or null when the base set is active. */
  public get activeBreakpoint(): number | null {
    return this.list.columns.activeSet?.maxWidth ?? null;
  }

  /**
   * Structural cells (selection checkbox, row actions, drag handle) render outside the
   * column loop and must agree across `<thead>`, `<tbody>` and `<tfoot>`, so the active
   * set's overrides are resolved here once and bound to all three bands.
   */
  public get selectionEnabled(): SelectionController | null {
    return this.list.columns.activeSet?.selection === false
      ? null
      : this.list.selection;
  }

  public get rowActionsEnabled(): boolean {
    return this.list.columns.activeSet?.rowActions === false
      ? false
      : this.list.hasRowActions;
  }

  public reorderEnabledFor(enabled: boolean | null): boolean {
    return this.list.columns.activeSet?.reorder === false
      ? false
      : !!enabled;
  }

  /**
   * The head band follows the active set's declared headers and nothing else: a set whose
   * columns declare no header template and no title renders no `<thead>` at all, matching
   * how `<tfoot>` follows `hasFooter`. An empty header row is worse than none -- it draws a
   * rule and reserves height for labels that do not exist.
   *
   * Structural cells do not keep the band alive. The select-all checkbox lives in the head,
   * so it goes with it; a set that wants select-all has to declare at least one header.
   */
  public get showHead(): boolean {
    return this.list.columns.hasHeader;
  }

  private _emitFiltersReadyEvent(): void {
    if (!!this.filterRef && this._filterParamsReady) {
      this.filtersReady.emit();
      this._cdRef.markForCheck();
    }
  }

  public get inDialog() {
    return !!this._dialogRef || !!this._drawerRef;
  }

  /**
   * Initialize config for list
   *
   * @param config
   */
  private _initWithConfig(config: FsListConfig<TRow>) {
    if (this.list) {
      this.list.destroy();
    }

    const defaultConfig: FsListConfig<TRow> = {
      queryParam: true,
      chips: true,
      paging: {
        strategy: PaginationStrategy.Offset,
        limit: 25,
      },
      noResults: {
        message: 'No Results Found',
      },
    };

    const globalConfig = cloneDeep(this._config || {});
    const listConfig = mergeWith(defaultConfig, globalConfig, config, this._configMergeCustomizer);

    this._mergedListConfig = listConfig;
    this._cellRowTypeFromConfig = listConfig.cellRowType;

    if (listConfig.persist !== false) {
      this._restorePersistance(listConfig.persist);
    }

    this._updateCustomizeAction(listConfig.actions);

    // Before the List is built: initializeColumns reads the already-active breakpoint so
    // the first paint uses the right set instead of flashing the desktop columns.
    this._breakpoints.initConfig(listConfig.breakpoints);
    this._breakpoints.observe(this._el.nativeElement);

    this.list = new List(
      this._el,
      listConfig,
      this._selectionDialog,
      this._route,
      this._persistance,
      this.inDialog,
      this._breakpoints,
    );

    this.rowHoverHighlight = this.list.rowHoverHighlight;

    this._waitFirstLoad();

    this.reorderController.initWithConfig(
      config.reorder,
      this.list.dataController,
      this.list.actions,
      this.list.selection,
    );

    this._rebuildColumns();
    this._listenSortingChange();
    this._propagateCellRowTypeAnchors();
    this._listenBreakpointChange();
  }

  /**
   * The active set changes which structural cells render and whether `<thead>` has content,
   * and this component is OnPush, so a swap has to mark it.
   */
  private _listenBreakpointChange() {
    this.list.columns.activeSet$
      .pipe(
        takeUntil(this.list.destroy$),
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        this._cdRef.markForCheck();
      });
  }

  /**
   * Find action with customize flag and re-declare click function for CustomizeColsDialog
   *
   * @param actions
   */
  private _updateCustomizeAction(actions: FsListAction[]) {
    const customizeAction = actions?.find((action) => action.customize);

    if (customizeAction) {
      const actionClickFn = customizeAction.click;

      customizeAction.click = () => {
        if (actionClickFn) {
          actionClickFn(null);
        }

        this._dialog
          .open(CustomizeColsDialogComponent, {
            autoFocus: false,
            injector: this._injector,
            data: {
              columns: this.list.columns.columnsForDialog,
              changeFn: this.list.columns.changeFn,
            },
          })
          .afterClosed()
          .pipe(
            takeUntil(this.list.destroy$),
            takeUntil(this._destroy),
          )
          .subscribe((data) => {
            if (data) {
              this.list.columns.updateVisibilityForCols(data);
              this._cdRef.markForCheck();
            }
          });
      };
    }
  }

  /**
   * Update sorting in filter
   */
  private _listenSortingChange() {
    this.list.sorting
      .sortingChanged$
      .pipe(
        takeUntil(this.list.destroy$),
        takeUntil(this._destroy),
      )
      .subscribe((sort) => {
        this._filterRef.updateSort(sort, false);
      });
  }

  private _subscribeToRemoveRow() {
    this.rowRemoved
      .pipe(takeUntil(this._destroy))
      .subscribe((row) => {
        this.list.dataController.removeData(row);
        this.list.dataController.visibleRows
          .forEach((item: Row) => item.updateActions());
      });
  }

  private _subscribeToGroupExpandStatusChange() {
    if (this.list.dataController.hasGroups) {
      this._groupExpandNotifier.expandStatusChange$
        .pipe(
          takeUntil(this._destroy),
        )
        .subscribe((row) => {
          this.list.dataController.toggleRowGroup(row);
        });
    }
  }

  private _waitFirstLoad() {
    this.list.loading$
      .pipe(
        skip(1),
        filter((value) => !value),
        take(1),
        takeUntil(this.list.destroy$),
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        this.firstLoad = false;
        this._cdRef.markForCheck();
      });
  }

  private _configMergeCustomizer(objValue: any) {
    if (Array.isArray(objValue)) {
      return objValue;
    }
  }

  private _restorePersistance(persistConfig: FsListPersitance) {
    this._persistance.init(persistConfig, this.inDialog);
  }

  private _propagateCellRowTypeAnchors() {
    if (!this.columnTemplates || !this._mergedListConfig) {
      return;
    }

    const anchor = this.cellRowType;

    const applyTo = (col: FsListColumnDirective) => {
      this._maybeApplyCellTyping(col.cellConfigs, anchor, this._mergedListConfig);
      this._maybeApplyCellTyping(col.groupHeaderConfigs, anchor, this._mergedListConfig);
      this._maybeApplyCellTyping(col.groupFooterConfigs, anchor, this._mergedListConfig);
    };

    this.columnTemplates.forEach(applyTo);

    // Breakpoint columns are a separate query, so they need the same anchor or their
    // cell templates lose `let-row` typing under strictTemplates.
    this.breakpointDirectives?.forEach((breakpoint) => {
      breakpoint.columnDirectives?.forEach(applyTo);
    });
  }

  private _maybeApplyCellTyping(dir: unknown, anchor: unknown, listConfig: FsListConfig<TRow>) {
    if (!(dir instanceof FsListCellDirective)) {
      return;
    }
    if (dir.rowType !== undefined || dir.configTyping !== undefined) {
      return;
    }
    if (anchor != null) {
      dir.rowType = anchor;
    } else {
      dir.configTyping = listConfig;
    }
  }
}
