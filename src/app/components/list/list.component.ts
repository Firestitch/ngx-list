import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  DoCheck,
  IterableDiffer,
  ContentChildren,
  QueryList,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  IterableDiffers,
} from '@angular/core';

import { FsListColumnDirective } from '../../directives';
import { FsListConfig } from '../../models/list-config.model';


@Component({
  selector: 'fs-list',
  templateUrl: 'list.component.html',
  styleUrls: [
    './list.component.scss',
  ],

  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FsListComponent implements OnInit, DoCheck, OnDestroy {
  @Input() public config: any;
  @Input() public columns: any;
  @Input() public inlineFilters: boolean;
  @Input() public rows: any[];

  public displayRows;
  public listConfig: FsListConfig;
  /**
   * Set columns to config
   * Create Column Model instances
   *
   * @param {QueryList<FsListColumnDirective>} val
   */
  @ContentChildren(FsListColumnDirective)
  set columnTemplates(val: QueryList<FsListColumnDirective>) {
    this.listConfig.tranformTemplatesToColumns(val);
  }

  private _rowsDiffer: IterableDiffer<any[]>;

  constructor(private cdRef: ChangeDetectorRef,
              private differs: IterableDiffers) {
    this._rowsDiffer = differs.find([]).create(null);
  }

  public actionClick() {
    alert('TODO');
  }

  public ngOnInit() {
    this.listConfig = new FsListConfig(this.config);
    this.listConfig.rows = this.rows;

    debugger;
    if (!this.listConfig.filters || this.listConfig.filters.length === 0) {
      this.listConfig.load();
    }

    this.listConfig.data$.subscribe((rows) => {
      this.displayRows = rows;
    });
  }

  public ngDoCheck() {
    const rowsDiffer = this._rowsDiffer.diff(this.rows);
    const displayRowsDiffer = this._rowsDiffer.diff(this.displayRows);

    if (rowsDiffer || displayRowsDiffer) {
      this.cdRef.markForCheck();
    }

    if (this.listConfig.paging.manual && rowsDiffer) {
      this.listConfig.paging.updatePagingManual(this.rows);
      this.listConfig.paging.pageChanged.next();
    }
  }

  public ngOnDestroy() {
    this.listConfig.data$.complete();
    this.listConfig.paging.pageChanged.complete();
  }
}
