import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { ActionType, FsListComponent, FsListConfig } from '@firestitch/list';

import { map } from 'rxjs/operators';
import { FsListComponent as FsListComponent_1 } from '../../../../src/app/components/list/list.component';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListHeaderDirective } from '../../../../src/app/directives/header/header.directive';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';


@Component({
    selector: 'row-actions',
    templateUrl: './row-actions.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsListComponent_1,
        FsListColumnDirective,
        FsListHeaderDirective,
        FsListCellDirective,
    ],
})
export class RowActionsComponent implements OnInit {

  @ViewChild('table', { static: true })
  public table: FsListComponent;
  public config: FsListConfig;

  constructor(private _fsApi: FsApi) { }

  public ngOnInit() {

    this.config = {
      rowActions: [
        {
          click: (row, event) => {
            console.log('Done Click', row, event);
          },
          show: (row) => row.name !== 'Object 2',
          menu: false,
          icon: 'done',
          className: 'mat-warn',
          type: ActionType.Icon,
        },
        {
          click: (row, event) => {
            console.log('Settings Click', row, event);
          },
          menu: false,
          icon: 'settings',
          type: ActionType.MiniFab,
        },
        {
          click: (row, event) => {
            console.log('Cancel Click', row, event);
          },
          icon: 'clear',
          label: 'Cancel',
          type: ActionType.Raised,
        },
        {
          click: (row, event) => {
            console.log('edit', row, event);
          },
          menu: true,
          icon: 'edit',
          label: 'Edit',
          type: ActionType.Basic,
        },
        {
          click: (row, event) => {
            console.log('delete', row, event);
          },
          menu: true,
          icon: 'delete',
          label: 'Remove',
        },
      ],
      fetch: (query) => {
        query.count = 3;
        query.limit = 3;

        return this._fsApi.get('dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
      paging: false,
      status: false,
    };
  }
}
