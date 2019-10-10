import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { FsListConfig, ActionType, FsListComponent } from '@firestitch/list';

import { map } from 'rxjs/operators';
import { ItemType } from '@firestitch/filter';
import { StrategyBaseComponent } from '../examples/strategy-base/strategy-base.component';
import { ApiStrategy } from '../../services/api-strategy.service';


@Component({
  selector: 'restore',
  templateUrl: 'restore.component.html',
  styles: []
})
export class RestoreComponent extends StrategyBaseComponent implements OnInit {

  @ViewChild('table', { static: true })
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  constructor(
    protected _apiStrategy: ApiStrategy,
    private _fsApi: FsApi,
    private _router: Router
  ) {
    super(_apiStrategy);
  }

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
          type: ActionType.Basic,
        }
      ],
      filters: [
        {
          name: 'keyword',
          type: ItemType.Text,
          label: 'Search'
        }
      ],
      fetch: (query) => {
        query.count = 500;
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .pipe(
            map(response => ({ data: response.data.objects, paging: response.data.paging })),
          );
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
