import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import { ActionType, FsListComponent, FsListConfig } from '@firestitch/list';

import { map } from 'rxjs/operators';

import { ApiStrategy } from '../../services/api-strategy.service';
import { StrategyBaseComponent } from '../examples/strategy-base/strategy-base.component';


@Component({
  selector: 'restore',
  templateUrl: './restore.component.html',
})
export class RestoreComponent extends StrategyBaseComponent implements OnInit {

  @ViewChild('table', { static: true })
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  constructor(
    protected _apiStrategy: ApiStrategy,
    private _fsApi: FsApi,
    private _router: Router,
  ) {
    super(_apiStrategy);
  }

  public ngOnInit() {

    this.config = {
      status: true,
      filterInput: true,
      queryParam: false,
      persist: false,
      restore: {
        query: { state: 'deleted' },
        menuLabel: 'Restore',
        click: (row, event) => {
          console.log('Restore', row, event);
        },
        reload: true,
      },
      paging: {
        limits: [5, 15, 50, 150, 250, 500, 1000],
      },
      rowActions: [
        {
          click: (row, event) => {
            console.log('Delete', row, event);
          },
          menu: true,
          label: 'Delete',
          type: ActionType.Basic,
        },
      ],
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
      ],
      fetch: (query) => {
        query.count = 500;

        return this._fsApi.get('https://specify.firestitch.dev/api/dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
