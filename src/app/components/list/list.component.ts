import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy,
} from '@angular/core';

import { FsListColumnDirective } from '../../directives';
import { FsListModel } from '../../models/list-config.model';
import { FsListConfig } from '../../interfaces/listconfig.interface';


@Component({
  selector: 'fs-list',
  templateUrl: 'list.component.html',
  styleUrls: [
    './list.component.scss',
  ],

  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FsListComponent implements OnInit, OnDestroy {
  @Input() public config: FsListConfig;
  //@Input() public rows: any[];

  public displayRows;
  public listConfig: FsListModel;
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

  //private _rowsDiffer: IterableDiffer<any[]>;

  // constructor(private cdRef: ChangeDetectorRef,
  //             private differs: IterableDiffers) {
  //   this._rowsDiffer = differs.find([]).create(null);
  // }

  public ngOnInit() {
    this.listConfig = new FsListModel(this.config);
    //this.listConfig.rows = this.rows;

    if (!this.listConfig.filters || this.listConfig.filters.length === 0 && this.listConfig.initialFetch) {
      this.listConfig.load();
    }

    this.listConfig.data$.subscribe((rows) => {
      this.displayRows = rows;
    });
  }

  //public ngDoCheck() {
    // const rowsDiffer = this._rowsDiffer.diff(this.rows);
    // const displayRowsDiffer = this._rowsDiffer.diff(this.displayRows);

    // if (rowsDiffer || displayRowsDiffer) {
    //   this.cdRef.markForCheck();
    // }

    // if (this.listConfig.paging.manual && rowsDiffer) {
    //   this.listConfig.paging.updatePagingManual(this.rows);
    //   this.listConfig.paging.pageChanged.next();
    // }
  //}

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
    this.listConfig.load();
  }
}
