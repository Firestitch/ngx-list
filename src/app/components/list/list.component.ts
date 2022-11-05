import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  HostBinding,
  Optional,
  ContentChild,
  TemplateRef,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { filter, skip, take, takeUntil } from 'rxjs/operators';

import { FsScrollService } from '@firestitch/scroll';
import { FilterComponent } from '@firestitch/filter';
import { SelectionDialog } from '@firestitch/selection';
import { getNormalizedPath } from '@firestitch/common';
import { DrawerRef } from '@firestitch/drawer';

import { cloneDeep, mergeWith } from 'lodash-es';

import { List } from '../../classes/list-controller';
import { ReorderController } from '../../classes/reorder-controller';

import { FsListColumnDirective } from '../../directives/column/column.directive';
import { FsListEmptyStateDirective } from '../../directives/empty-state/empty-state.directive';
import { FS_LIST_DEFAULT_CONFIG } from '../../fs-list.providers';

import {
  FsListAbstractRow,
  FsListAction,
  FsListConfig, FsListPersitance, FsListSelectionConfig,
  FsListTrackByFn,
  FsListTrackByTargetRowFn
} from '../../interfaces';
import { CustomizeColsDialogComponent } from '../customize-cols/customize-cols.component';
import { GroupExpandNotifierService } from '../../services/group-expand-notifier.service';
import { PersistanceController } from '../../classes/persistance-controller';


@Component({
  selector: 'fs-list',
  templateUrl: 'list.component.html',
  styleUrls: [
    './list.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    GroupExpandNotifierService,
    PersistanceController,
    ReorderController,
  ]
})
export class FsListComponent implements OnInit, OnDestroy {

  @HostBinding('class.fs-list') classFsList = true;

  @Input('config')
  set config(config: FsListConfig) {
    this._initWithConfig(config)
  }

  @Input()
  public loaderLines = 3;

  @Output()
  public filtersReady = new EventEmitter<void>();

  public list: List;
  public keywordVisible = false;
  private listColumnDirectives: QueryList<FsListColumnDirective>;

  // Event will fired if action remove: true will clicked
  public rowRemoved = new EventEmitter();
  public firstLoad = true;

  // public readonly ReorderStrategy = ReorderStrategy;

  private _filterRef: FilterComponent;
  private _filterParamsReady = false;
  private _inDialog = !!this._dialogRef || !!this._drawerRef;

  private _destroy = new Subject();

  @ViewChild(FilterComponent)
  private set filterReference(component) {
    this._filterRef = component;
    this.list.actions.setFilterRef(component);

    this._emitFiltersReadyEvent();
  }

  /**
   * Set columns to config
   * Create Column Model instances
   *
   */
  @ContentChildren(FsListColumnDirective)
  private set columnTemplates(listColumnDirectives: QueryList<FsListColumnDirective>) {
    this.listColumnDirectives = listColumnDirectives;
    if (this.list) {
      this.list.tranformTemplatesToColumns(listColumnDirectives);
    }
  }

  @ContentChild(FsListEmptyStateDirective, { read: TemplateRef })
  private set _emptyStateTemplate(template: TemplateRef<any>) {
    if (this.list) {
      this.list.emptyStateTemplate = template;
    }
  }

  constructor(
    public reorderController: ReorderController,
    @Optional() @Inject(FS_LIST_DEFAULT_CONFIG) private _defaultOptions,
    @Optional() private fsScroll: FsScrollService,
    @Optional() private _dialogRef: MatDialogRef<any>,
    @Optional() private _drawerRef: DrawerRef<any>,
    private _el: ElementRef,
    private selectionDialog: SelectionDialog,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private _groupExpandNotifier: GroupExpandNotifierService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _persistance: PersistanceController,
    private _location: Location,
  ) {}

  /**
   * Return reference for filter
   */
  public get filterRef(): FilterComponent {
    return this._filterRef;
  }

  public get groupEnabled() {
    return this.list.dataController.groupEnabled;
  }
  
  public get hasFilterKeyword(): boolean {
    return this.list.filterInput && this.keywordVisible;
  }

  public get hasStatus() {
    return this.list.status &&
      !this.reorderController.manualReorderActivated && 
      this.list.paging.enabled &&    
      (!this.reorderController.enabled || this.reorderController.status) &&
      ((this.list.scrollable && this.list.scrollable.status) || !this.list.scrollable)
  }

  public get paginatorVisible(): boolean {
    return this.list.paging.enabled
      && !this.firstLoad
      && !this.list.scrollable
      && !this.list.emptyStateEnabled
      && this.list.dataController.visibleRowsCount > 0
      && this.list.paging.pages > 1;
  }

  public set groupEnabled(value: boolean) {
    this.list.groupEnabled(value);
  }

  public get filtersQuery(): Record<string, unknown> {
    return this.list.filtersQuery;
  }

  public ngOnInit() {
    this._subscribeToRemoveRow();
    this._subscribeToGroupExpandStatusChange();
  }

  public ngOnDestroy() {
    if (this.list) {
      this.list.destroy();
    }

    this._destroy.next();
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

  public reload() {
    this.list.reload();
  }

  public getData(trackBy?: FsListTrackByFn) {
    return this.list.getData(trackBy);
  }

  public hasData(trackBy: FsListTrackByFn) {
    return this.list.hasData(trackBy);
  }

  public updateData(
    rows: FsListAbstractRow | FsListAbstractRow[],
    trackBy?: FsListTrackByTargetRowFn
  ): boolean {
    return this.list.dataController.updateData(rows, trackBy);
  }

  public replaceRow(
    row: FsListAbstractRow,
    trackBy?: FsListTrackByTargetRowFn
  ): boolean {
    return this.list.dataController.replaceData(row, trackBy);
  }

  public updateSelectionConfig(config: FsListSelectionConfig) {
    this.list.selection.updateConfig(config);
  }

  public resetSelectionActions() {
    this.list.selection.resetActions();
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
    this.list.filtersReady$.next();
    this._filterParamsReady = true;
    this._emitFiltersReadyEvent();
  }

  /**
   * Update visibility for specific column
   */
  public columnVisibility(name: string, show: boolean) {
    this.columnsVisibility([ {name, show } ])
  }

  /**
   * Update visibility for list of specific columns
   */
  public columnsVisibility(columns: { name: string, show: boolean }[]) {
    this.list.columns.updateVisibilityForCols(columns);
  }

  private _emitFiltersReadyEvent(): void {
    if (!!this.filterRef && this._filterParamsReady) {
      this.filtersReady.emit();

      this.keywordVisible = this.filterRef.hasKeyword;
      this.cdRef.markForCheck();
    }
  }

  /**
   * Initialize config for list
   * @param config
   */
  private _initWithConfig(config: FsListConfig) {
    if (this.list) {
      this.list.destroy();
    }

    const defaultOpts = this._defaultOptions
      ? cloneDeep(this._defaultOptions)
      : {};
    const listConfig = mergeWith(defaultOpts, config, this._configMergeCustomizer);

    if (listConfig.persist !== false) {
      this._restorePersistance(listConfig.persist);
    }

    this._updateCustomizeAction(listConfig.actions);

    this.list = new List(
      this._el,
      listConfig,
      this.fsScroll,
      this.selectionDialog,
      this._router,
      this._route,
      this._persistance,
      this._inDialog,
    );

    this._waitFirstLoad();
    this._listenFiltersQueryChange();

    this.reorderController.initWithConfig(
      config.reorder,
      this.list.dataController,
      this.list.actions,
    );

    if (this.listColumnDirectives) {
      this.list.tranformTemplatesToColumns(this.listColumnDirectives);
    }
    this._listenSortingChange();
  }

  /**
   * Find action with customize flag and re-declare click function for CustomizeColsDialog
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

        const dialogRef = this.dialog.open(CustomizeColsDialogComponent, {
          data: {
            columns: this.list.columns.columnsForDialog,
            changeFn: this.list.columns.changeFn,
          },
        });

        dialogRef
          .afterClosed()
          .pipe(
            takeUntil(this.list.onDestroy$),
            takeUntil(this._destroy),
          )
          .subscribe((data) => {
            if (data) {
              this.list.columns.updateVisibilityForCols(data);

              this.cdRef.markForCheck();
            }
          })
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
        takeUntil(this.list.onDestroy$),
        takeUntil(this._destroy),
      )
      .subscribe((sort) => {
        this._filterRef.updateSort(sort);
      })
  }

  private _subscribeToRemoveRow() {
    this.rowRemoved
      .pipe(takeUntil(this._destroy))
      .subscribe((row) => {
        this.list.dataController.removeData(row);
      })
  }

  private _subscribeToGroupExpandStatusChange() {
    if (this.list.dataController.hasGroups) {
      this._groupExpandNotifier.expandStatusChange$
        .pipe(
          takeUntil(this._destroy)
        )
        .subscribe((row) => {
          this.list.dataController.toggleRowGroup(row);
        })
    }
  }

  private _waitFirstLoad() {
    this.list.loading$
      .pipe(
        skip(1),
        filter((value) => value === false),
        take(1),
        takeUntil(this.list.onDestroy$),
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        this.firstLoad = false;
        this.cdRef.markForCheck();
      });
  }

  private _listenFiltersQueryChange() {
    this.list.filtersQuery$
      .pipe(
        takeUntil(this.list.onDestroy$),
        takeUntil(this._destroy),
      )
      .subscribe((value) => {
        if (value) {
          const activeFilters = Object.keys(value).length;

          this.reorderController.setNunberOfActiveFilters(activeFilters);
        }
      });
  }

  private _configMergeCustomizer(objValue: any, srcValue: any) {
    if (Array.isArray(objValue)) {
      return objValue;
    }
  }

  private _restorePersistance(persistConfig: FsListPersitance) {
    const namespace = getNormalizedPath(this._location);
    this._persistance.setConfig(persistConfig, namespace, this._inDialog);
  }
}
