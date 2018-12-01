import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FsApi } from '@firestitch/api';

import 'rxjs/add/operator/map';

import { FsListConfig } from '../../../../src';
import { FsListComponent } from '../../../../src/app/components/list';


@Component({
  selector: 'selection',
  templateUrl: 'selection.component.html',
  styles: []
})
export class SelectionComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  constructor(private _fsApi: FsApi, private _router: Router) {}

  public ngOnInit() {

    this.config = {
      heading: 'Selection',
      status: true,
      filterInput: true,
      paging: {
        limits: [5, 15, 50]
      },
      filters: [
        {
          name: 'keyword',
          type: 'text',
          label: 'Search'
        },
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
