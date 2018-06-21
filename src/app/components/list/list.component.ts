import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ContentChildren,
  QueryList,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { FsListColumnDirective } from '../../directives';
import { FsListModel } from '../../models';
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

  public displayRows = [];
  public listConfig: FsListModel;
  @ViewChild('scrollable', { read: ElementRef }) public scrl;
  /**
   * Set columns to config
   * Create Column Model instances
   *
   * @param {QueryList<FsListColumnDirective>} val
   */
  @ContentChildren(FsListColumnDirective)
  private set columnTemplates(val: QueryList<FsListColumnDirective>) {
    this.listConfig.tranformTemplatesToColumns(val);
  }

  public ngOnInit() {

    this.listConfig = new FsListModel(this.config);

    if (!this.listConfig.filters || this.listConfig.filters.length === 0 && this.listConfig.initialFetch) {
      this.listConfig.load$.next();
    }

    this.listConfig.data$.subscribe((rows) => {
      if (this.listConfig.scrollable) {
        this.displayRows.push(...rows);
      } else {
        this.displayRows = rows;
      }
    });
  }

  public ngOnDestroy() {
    this.listConfig.data$.complete();
    this.listConfig.paging.pageChanged.complete();
  }

  public nextPage() {
    this.listConfig.paging.goNext();
  }

  public prevPage() {
    this.listConfig.paging.goPrev();
  }

  public firstPage() {
    this.listConfig.paging.goFirst();
  }

  public lastPage() {
    this.listConfig.paging.goLast();
  }

  public load() {
    this.listConfig.load$.next();
  }

  public finishReorder() {
    this.listConfig.reoderEnabled = false;
    if (this.listConfig.reoder.done) {
      this.listConfig.reoder.done(this.displayRows);
    }
  }
}
