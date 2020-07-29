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
  HostBinding, Optional,
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
import { FS_LIST_DEFAULT_CONFIG } from '../../fs-list.providers';

import {
  FsListAbstractRow,
  FsListAction,
  FsListConfig, FsListPersitance,
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

    if (this.list) {
      this.list.destroy();
    }

    const defaultOpts = cloneDeep(this._defaultOptions);
    const listConfig = mergeWith(defaultOpts, config, this._configMergeCustomizer);

    this._restorePersistance(config.persist);

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

    this.reorderController.initWithConfig(
      config.reorder,
      this.list.dataController,
      this.list.actions,
    );

    if (this.listColumnDirectives) {
      this.list.tranformTemplatesToColumns(this.listColumnDirectives);
    }
  }

  public list: List;
  private listColumnDirectives: QueryList<FsListColumnDirective>;

  // Event will fired if action remove: true will clicked
  public rowRemoved = new EventEmitter();
  public firstLoad = true;

  // public readonly ReorderStrategy = ReorderStrategy;

  private _inDialog = !!this._dialogRef || !!this._drawerRef;

  private _destroy = new Subject();

  @ViewChild(FilterComponent) private _filter: FilterComponent;

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

  constructor(
    public reorderController: ReorderController,
    private _el: ElementRef,
    @Inject(FS_LIST_DEFAULT_CONFIG) private _defaultOptions,
    private fsScroll: FsScrollService,
    private selectionDialog: SelectionDialog,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private _groupExpandNotifier: GroupExpandNotifierService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _persistance: PersistanceController,
    private _location: Location,
    @Optional() private _dialogRef: MatDialogRef<any>,
    @Optional() private _drawerRef: DrawerRef<any>,
  ) {}

  get filter() {
    return this._filter;
  }

  get groupEnabled() {
    return this.list.dataController.groupEnabled;
  }

  set groupEnabled(value: boolean) {
    this.list.groupEnabled(value);
  }

  public ngOnInit() {
    this._subscribeToRemoveRow();
    this._initCustomizableAction();
    this._subscribeToGroupExpandStatusChange();
    this._waitFirstLoad();
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

  private _initCustomizableAction() {
    const customizableAction = this.list.actions.actionsList
      .find((action) => action.customize);

    if (customizableAction) {
      customizableAction.click = () => {
        const dialogRef = this.dialog.open(CustomizeColsDialogComponent, {
          data: {
            columns: this.list.columns.columnsForDialog,
            changeFn: this.list.columns.changeFn,
          },
        });

        dialogRef.afterClosed()
          .pipe(
            takeUntil(this._destroy),
          )
          .subscribe((data) => {
            if (data) {
              this.list.columns.updateVisibilityForCols(data);

              this.cdRef.markForCheck();
            }
          })
      }
    }
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
        takeUntil(this._destroy),
      )
      .subscribe(() => {
        this.firstLoad = false;
        this.cdRef.markForCheck();
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
