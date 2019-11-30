import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig, ReorderPosition, ReorderStrategy } from '@firestitch/list';

import { map } from 'rxjs/operators';


@Component({
  selector: 'custom-reorder',
  templateUrl: './custom.component.html',
  styles: [
    `
      .custom-reorder {
        margin-bottom: 20px
      }
    `
  ]
})
export class CustomReorderComponent implements OnInit {

  @ViewChild('table', { static: true })
  public table: FsListComponent; // Controller fs-list

  public config: FsListConfig = null;

  constructor(private _fsApi: FsApi, private _router: Router) {}

  public ngOnInit() {
    this.config = {
      heading: 'Reorder',
      subheading: 'With Custom strategy and positioned to right',
      status: false,
      filterInput: true,
      reorder: {
        position: ReorderPosition.Left,
        strategy: ReorderStrategy.Custom,
        start: () => {
          console.log('reorder started');
        },
        moved: (data) => {
          console.log('reorder moved', data);
        },
        done: (data) => {
          console.log('reorder finished', data);
        }
      },
      fetch: query => {
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .pipe(
            map(response => ({ data: response.data.objects, paging: response.data.paging })),
          );
      }
    };
  }

  public reorderStart() {
    this.table.reorderStart();
  }

  public reorderEnd() {
    this.table.reorderFinish();
  }

}
