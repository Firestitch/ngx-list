import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ContentChildren,
  ViewChild,
  Inject,
  QueryList,
  EventEmitter,
} from '@angular/core';
import { FsScrollService } from '@firestitch/scroll';
import { FilterComponent } from '@firestitch/filter';
import { SelectionDialog } from '@firestitch/selection';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { cloneDeep, mergeWith } from 'lodash-es';

import { List } from '../../models/list.model';
import { ReorderStrategy } from '../../models/reorder.model';

import { FsListColumnDirective } from '../../directives/column/column.directive';
import { FS_LIST_DEFAULT_CONFIG } from '../../fs-list.providers';

import { FsListAbstractRow, FsListConfig, FsListTrackByFn, FsListTrackByTargetRowFn } from '../../interfaces';


@Component({
  selector: 'fs-list',
  templateUrl: 'list.component.html',
  styleUrls: [
    './list.component.scss',
  ]
})

export class FsListComponent implements OnInit, OnDestroy {

  @Input('config') set config(config: FsListConfig) {

    if (this.list) {
      this.list.destroy();
    }

    const defaultOpts = cloneDeep(this._defaultOptions);
    const listConfig = mergeWith(defaultOpts, config, this._configMergeCustomizer);
    this.list = new List(listConfig, this.fsScroll, this.selectionDialog);

    if (this.listColumnDirectives) {
      this.list.tranformTemplatesToColumns(this.listColumnDirectives);
    }
  }

  public list: List;
  private listColumnDirectives: QueryList<FsListColumnDirective>;

  // Event will fired if action remove: true will clicked
  public rowRemoved = new EventEmitter();

  public readonly ReorderStrategy = ReorderStrategy;

  private _destroy = new Subject();

  @ViewChild('filter') private _filter: FilterComponent;

  /**
   * Set columns to config
   * Create Column Model instances
   *
   * @param val
   */
  @ContentChildren(FsListColumnDirective)
  private set columnTemplates(listColumnDirectives: QueryList<FsListColumnDirective>) {
    this.listColumnDirectives = listColumnDirectives;
    if (this.list) {
      this.list.tranformTemplatesToColumns(listColumnDirectives);
    }
  }

  constructor(
    @Inject(FS_LIST_DEFAULT_CONFIG) private _defaultOptions,
    private fsScroll: FsScrollService,
    private selectionDialog: SelectionDialog,
  ) {}

  get filter() {
    return this._filter;
  }

  public ngOnInit() {
    this.subscribeToRemoveRow();
  }

  public ngOnDestroy() {
    this.list.destroy();

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

  public getData(trackBy: FsListTrackByFn) {
    return this.list.getData(trackBy);
  }

  public hasData(trackBy: FsListTrackByFn) {
    return this.list.hasData(trackBy);
  }

  public updateData(
    rows: FsListAbstractRow | FsListAbstractRow[],
    trackBy?: FsListTrackByTargetRowFn
  ): boolean {
    return this.list.updateData(rows, trackBy);
  }

  public removeData(data: FsListAbstractRow | FsListAbstractRow[] | FsListTrackByTargetRowFn): boolean {
    return this.list.removeData(data);
  }

  public setHeading(heading: string) {
    this.list.heading = heading;
  }

  public setSubheading(subheading: string) {
    this.list.subheading = subheading;
  }

  public reorderStart() {
    this.list.reorder.enabled = true;
  }

  public reorderFinish() {
    this.list.reorder.enabled = false;
  }

  private subscribeToRemoveRow() {
    this.rowRemoved
      .pipe(takeUntil(this._destroy))
      .subscribe((row) => {
        this.list.removeData(row);
      })
  }

  private _configMergeCustomizer(objValue: any, srcValue: any) {
    if (Array.isArray(objValue)) {
      return objValue;
    }
  }
}
