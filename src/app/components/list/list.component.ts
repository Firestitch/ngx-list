import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ContentChildren,
  QueryList,
  ViewChild,
  Inject,
} from '@angular/core';
import { FsScrollService } from '@firestitch/scroll';
import { FilterComponent } from '@firestitch/filter';
import { SelectionDialog } from '@firestitch/selection';

import * as _cloneDeep from 'lodash/cloneDeep';

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
    const listConfig = Object.assign(defaultOpts, this.config);
    this.list = new List(listConfig, this.fsScroll, this.selectionDialog);
  }

  public ngOnDestroy() {
    this.list.destroy();
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
}
