import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FsApi } from '@firestitch/api';

import { FsListConfig } from '../../../../src';

import 'rxjs/add/operator/map';


@Component({
  selector: 'reorder',
  templateUrl: './reorder.component.html',
  styles: []
})
export class ReorderComponent implements OnInit {

  public config: FsListConfig = null;

  constructor(private _fsApi: FsApi, private _router: Router) {}

  public ngOnInit() {

    this.config = {
      heading: 'Reorder',
      status: false,
      filterInput: true,
      filters: [],
      reorder: {
        start: () => {
          console.log('reorder started');
        },
        done: function (data) {
          console.log(data);
        }
      },
      actions: [],
      rowActions: [],
      fetch: query => {
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .map(response => ({ data: response.data.objects, paging: response.data.paging }));
      }
    };
  }

}
