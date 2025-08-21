import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig, ReorderPosition } from '@firestitch/list';

import { map } from 'rxjs/operators';
import { MatButton } from '@angular/material/button';
import { FsListComponent as FsListComponent_1 } from '../../../../../src/app/components/list/list.component';
import { FsListColumnDirective } from '../../../../../src/app/directives/column/column.directive';
import { FsListHeaderDirective } from '../../../../../src/app/directives/header/header.directive';
import { FsListCellDirective } from '../../../../../src/app/directives/cell/cell.directive';


@Component({
    selector: 'custom-reorder',
    templateUrl: './custom.component.html',
    styles: [
        `
      .custom-reorder {
        margin-bottom: 20px
      }
    `,
    ],
    standalone: true,
    imports: [
        MatButton,
        FsListComponent_1,
        FsListColumnDirective,
        FsListHeaderDirective,
        FsListCellDirective,
    ],
})
export class CustomReorderComponent implements OnInit {

  @ViewChild('table', { static: true })
  public table: FsListComponent; // Controller fs-list

  public config: FsListConfig = null;

  constructor(private _fsApi: FsApi, private _router: Router) { }

  public ngOnInit() {
    this.config = {
      heading: 'Reorder',
      subheading: 'With Custom strategy and positioned to right',
      status: false,
      reorder: {
        position: ReorderPosition.Left,
        disabled: true,
        start: () => {
          console.log('reorder started');
        },
        moved: (data) => {
          console.log('reorder moved', data);
        },
        done: (data) => {
          console.log('reorder finished', data);
        },
      },
      fetch: (query) => {
        return this._fsApi.get('dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
    };
  }

  public reorderStart() {
    this.table.reorderStart();
  }

  public reorderEnd() {
    this.table.reorderFinish();
  }

}
