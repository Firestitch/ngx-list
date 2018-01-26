import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
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
  encapsulation: ViewEncapsulation.None
})
export class FsListComponent implements OnInit, AfterViewInit {
  @Input() public config;
  @Input() public columns: any;
  @Input() public rows: any;
  @Input() public inlineFilters: boolean;

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

  constructor() {
  }

  public ngOnInit() {
    if (!this.config) {
      this.config = new FsListConfig();
    }

    this.config.load();
  }

  public ngAfterViewInit() {
    // if (!this.config) {
    //   this.config = new FsListConfig({
    //     rows: this.rows,
    //     columnTemplates: this._columnTemplates,
    //   });
    // }
    // console.log(config);
    // console.log(this.cellComponents);
    // console.log(this.cellContents);
    // debugger;
    // this.loadData();
    // if (this.rowsContainer) {
    //   this.drawData();
    // }
  }
}
