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

import * as _cloneDeep from 'lodash/cloneDeep';
import * as _mergeWith from 'lodash/mergeWith';

import { FS_LIST_DEFAULT_CONFIG } from '../../../fslist.providers';
import { FsListColumnDirective } from '../../directives';
import { List } from '../../models';
import { FsListConfig } from '../../interfaces';


@Component({
  selector: 'fs-list',
  templateUrl: 'list.component.html',
  styleUrls: [
    './list.component.scss',
  ]
})

export class FsListComponent implements OnInit, OnDestroy {
  @Input() public config: FsListConfig;

  public list: List;

  // Event will fired if action remove: true will clicked
  public rowRemoved = new EventEmitter();

  private _destroy = new Subject();

  @ViewChild('filter') private _filter: FilterComponent;

  /**
   * Set columns to config
   * Create Column Model instances
   *
   * @param {QueryList<FsListColumnDirective>} val
   */
  @ContentChildren(FsListColumnDirective)
  private set columnTemplates(val: QueryList<FsListColumnDirective>) {
    this.list.tranformTemplatesToColumns(val);
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
    const defaultOpts = _cloneDeep(this._defaultOptions);
    const listConfig = _mergeWith(defaultOpts, this.config, this._configMergeCustomizer);
    this.list = new List(listConfig, this.fsScroll, this.selectionDialog);

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

  public deleteRows(rows, trackBy?: (targetRow: any, listRow: any) => boolean) {
    this.list.deleteRows(rows, trackBy);
  }

  public finishReorder() {
    this.list.reoderEnabled = false;
    if (this.list.reoder.done) {
      this.list.reoder.done(this.list.data);
    }
  }

  public setHeading(heading: string) {
    this.list.heading = heading;
  }

  public setSubheading(subheading: string) {
    this.list.subheading = subheading;
  }

  private subscribeToRemoveRow() {
    this.rowRemoved
      .pipe(takeUntil(this._destroy))
      .subscribe((row) => {
        this.list.deleteRows(row);
      })
  }

  private _configMergeCustomizer(objValue: any, srcValue: any) {
    if (Array.isArray(objValue)) {
      return objValue;
    }
  }
}
