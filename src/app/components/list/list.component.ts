import { Location } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';


import { getNormalizedPath } from '@firestitch/common';
import { DrawerRef } from '@firestitch/drawer';
import { FilterComponent } from '@firestitch/filter';
import { SelectionDialog } from '@firestitch/selection';

import { Observable, Subject } from 'rxjs';
import { filter, skip, take, takeUntil } from 'rxjs/operators';

import { cloneDeep, mergeWith } from 'lodash-es';

import { List } from '../../classes/list-controller';
import { PersistanceController } from '../../classes/persistance-controller';
import { ReorderController } from '../../classes/reorder-controller';
import {
  FsListHeadingContainerDirective, FsListHeadingDirective, FsListSubheadingDirective,
} from '../../directives';
import { FsListColumnDirective } from '../../directives/column/column.directive';
import { FsListEmptyStateDirective } from '../../directives/empty-state/empty-state.directive';
import { FS_LIST_DEFAULT_CONFIG } from '../../fs-list.providers';
import {
  FsListAbstractRow,
  FsListAction,
  FsListConfig, FsListPersitance, FsListSelectionConfig,
  FsListTrackByFn,
  FsListTrackByTargetRowFn,
} from '../../interfaces';
import { IPaginationState } from '../../interfaces/pagination-state.interface';
import { GroupExpandNotifierService } from '../../services/group-expand-notifier.service';
import { FsBodyComponent } from '../body/body.component';
import { CustomizeColsDialogComponent } from '../customize-cols/customize-cols.component';


@Component({
  selector: 'fs-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    GroupExpandNotifierService,
    PersistanceController,
    ReorderController,
  ],
})
export class FsListComponent implements OnInit, OnDestroy, AfterContentInit {

  @HostBinding('class.fs-list') public classFsList = true;

  @HostBinding('class.fs-list-row-highlight')
  public rowHoverHighlight: boolean;

  @Input('config')
  public set config(config: FsListConfig) {
    this._initWithConfig(config);
  }

  @Input()
  public loaderLines = 3;

  @Output()
  public filtersReady = new EventEmitter<void>();

  @ContentChild(FsListHeadingDirective, { read: TemplateRef })
  public headingTemplate: TemplateRef<any>;

  @ContentChild(FsListHeadingContainerDirective, { read: TemplateRef })
  public headingContainerTemplate: TemplateRef<any>;

  @ContentChild(FsListSubheadingDirective, { read: TemplateRef })
  public subheadingTemplate: TemplateRef<any>;

  @ViewChild(FsBodyComponent)
  public body: FsBodyComponent;

  public list: List;
  public keywordVisible = true;

  // Event will fired if action remove: true will clicked
  public rowRemoved = new EventEmitter();
  public firstLoad = true;

  private _listColumnDirectives: QueryList<FsListColumnDirective>;
  private _filterRef: FilterComponent;
  private _filterParamsReady = false;
  private _inDialog;

  private _destroy = new Subject();

  @ViewChild(FilterComponent)
  public set filterReference(component) {
    this._filterRef = component;
    this.list.actions.setFilterRef(component);

    this._emitFiltersReadyEvent();
  }

  /**
   * Set columns to config
   * Create Column Model instances
   */
  @ContentChildren(FsListColumnDirective)
  public set columnTemplates(listColumnDirectives: QueryList<FsListColumnDirective>) {
    this._listColumnDirectives = listColumnDirectives;
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
    @Optional() @Inject(FS_LIST_DEFAULT_CONFIG) private _defaultOptions: FsListConfig,
    @Optional() private _dialogRef: MatDialogRef<any>,
    @Optional() private _drawerRef: DrawerRef<any>,
    private _el: ElementRef,
    private _selectionDialog: SelectionDialog,
    private _dialog: MatDialog,
    private _cdRef: ChangeDetectorRef,
    private _groupExpandNotifier: GroupExpandNotifierService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _persistance: PersistanceController,
    private _location: Location,
  ) { 
    this._inDialog = !!this._dialogRef || !!this._drawerRef;
  }

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

  public get hasFilterKeyword(): boolean {
    return this.list.filterInput && this.keywordVisible;
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
    if (this.list.afterInit) {
      this.list.afterInit(this);
    }
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

  public reload(): Observable<any> {
    return this.list.reload();
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

  public replaceRow(
    row: FsListAbstractRow,
    trackBy?: FsListTrackByTargetRowFn,
  ): boolean {
    return this.list.dataController.replaceData(row, trackBy);
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
    this.filterRef.updateSortings(this.list.sorting.makeSortingList());
  }

  /**
   * Update visibility for list of specific columns
   */
  public columnsVisibility(columns: { name: string; show: boolean }[]) {
    this.list.columns.updateVisibilityForCols(columns);
  }

  private _emitFiltersReadyEvent(): void {
    if (!!this.filterRef && this._filterParamsReady) {
      this.filtersReady.emit();

      this.keywordVisible = this.filterRef.hasKeyword;
      this._cdRef.markForCheck();
    }
  }

  /**
   * Initialize config for list
   *
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
      this._selectionDialog,
      this._router,
      this._route,
      this._persistance,
      this._inDialog,
    );

    this.rowHoverHighlight = this.list.rowHoverHighlight;

    this._waitFirstLoad();

    this.reorderController.initWithConfig(
      config.reorder,
      this.list.dataController,
      this.list.actions,
      this.list.selection,
    );

    if (this._listColumnDirectives) {
      this.list.tranformTemplatesToColumns(this._listColumnDirectives);
    }
    this._listenSortingChange();
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

        this._dialog.open(CustomizeColsDialogComponent, {
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
        this._filterRef.updateSort(sort);
      });
  }

  private _subscribeToRemoveRow() {
    this.rowRemoved
      .pipe(takeUntil(this._destroy))
      .subscribe((row) => {
        this.list.dataController.removeData(row);
        this.body.rows
          .forEach((bodyRow) => bodyRow.actionsUpdate());
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
    const namespace = getNormalizedPath(this._location);
    this._persistance.setConfig(persistConfig, namespace, this._inDialog);
  }
}
