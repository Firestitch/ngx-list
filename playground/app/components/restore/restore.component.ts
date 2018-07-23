import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FsApi } from '@firestitch/api';

import { FsListConfig } from '../../../../src';
import { FsListComponent } from '../../../../src/app/components/list';
import { ActionType } from '../../../../src/app/models';

import 'rxjs/add/operator/map';


@Component({
  selector: 'restore',
  templateUrl: 'restore.component.html',
  styles: []
})
export class RestoreComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  constructor(private _fsApi: FsApi, private _router: Router) {}

  public ngOnInit() {

    this.config = {
      heading: 'Delete/Restore',
      status: true,
      filterInput: true,
      restore: {
        query: { state: 'deleted' },
        filterLabel: 'Show Deleted',
        menuLabel: 'Restore',
        click: (row, event) => {
          console.log('Restore', row, event);
        },
        reload: true,
      },
      paging: {
        limits: [5, 15, 50, 150, 250, 500, 1000]
      },
      rowActions: [
        {
          click: (row, event) => {
            console.log('Delete', row, event);
          },
          menu: true,
          label: 'Delete',
          type: ActionType.basic,
        }
      ],
      filters: [
        {
          name: 'keyword',
          type: 'text',
          label: 'Search'
        }
      ],
      fetch: (query) => {
        query.count = 500;
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .map(response => ({ data: response.data.objects, paging: response.data.paging }));
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
