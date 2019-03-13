import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { SelectionActionType } from '@firestitch/selection';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ItemType } from '@firestitch/filter';


@Component({
  selector: 'ago',
  templateUrl: 'ago.component.html',
  styles: []
})
export class AgoComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  constructor(private _fsApi: FsApi, private _router: Router) {}

  public ngOnInit() {

    this.config = {
      heading: 'Ago',
      status: true,
      filterInput: true,
      paging: {
        limits: [5, 15, 50]
      },
      filters: [
        {
          name: 'keyword',
          type: ItemType.Text,
          label: 'Search'
        },
      ],
      fetch: (query) => {
        query.count = 500;
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .pipe(
            map((response) => {
              return { data: response.data.objects, paging: response.data.paging }
            })
          );
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
