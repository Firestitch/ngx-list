import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ContentChildren,
  QueryList, ChangeDetectionStrategy, ChangeDetectorRef,
} from '@angular/core';

import { FsListColumnDirective } from '../../directives';
import { FsListConfig } from '../../models/list-config.model';

@Component({
  selector: 'fs-list',
  templateUrl: 'list.component.html',
  styleUrls: [
    './list.component.scss',
    './list-actions.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsListComponent implements OnInit {
  @Input() public config;
  @Input() public columns: any;
  @Input() public inlineFilters: boolean;

  @Input() public rows: any = [];

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

  constructor(private cdRef: ChangeDetectorRef) {
  }

  public ngOnInit() {
    if (!this.config) {
      this.config = new FsListConfig();
    }

    if (!this.config.filters || this.config.filters.length === 0) {
      this.config.load();
    }

    this.config.data$.subscribe((rows) => {
      this.rows = rows;
      this.cdRef.markForCheck();
    })
  }
}
