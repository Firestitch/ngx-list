import {
  Component,
  OnInit,
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

export class FsListComponent implements OnInit, DoCheck {
  @Input() public config: FsListConfig;
  @Input() public columns: any;
  @Input() public inlineFilters: boolean;
  @Input() public rows: any[];

  public displayRows;
  /**
   * Set columns to config
   * Create Column Model instances
   *
   * @param {QueryList<FsListColumnDirective>} val
   */
  @ContentChildren(FsListColumnDirective)
  set columnTemplates(val: QueryList<FsListColumnDirective>) {
    this.config.tranformTemplatesToColumns(val);
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
    if (!this.config) {
      this.config = new FsListConfig();
    }
    this.config.rows = this.rows;

    if (!this.config.filters || this.config.filters.length === 0) {
      this.config.load();
    }

    this.config.data$.subscribe((rows) => {
      this.displayRows = rows;
    });
  }

  public ngDoCheck() {
    const rowsDiffer = this._rowsDiffer.diff(this.rows);
    const displayRowsDiffer = this._rowsDiffer.diff(this.displayRows);

    if (rowsDiffer || displayRowsDiffer) {
      this.cdRef.markForCheck();
    }

    if (this.config.paging.manual && rowsDiffer) {
      this.config.paging.updatePagingManual(this.rows);
      this.config.paging.pageChanged.next();
    }
  }
}
