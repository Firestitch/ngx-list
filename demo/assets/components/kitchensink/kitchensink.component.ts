import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FsApi } from '@firestitch/api';
import { FsListConfig } from '../../../../src';
import 'rxjs/add/operator/map';
import { FsListComponent } from '../../../../src/app/components';

@Component({
  selector: 'kitchensink',
  templateUrl: 'kitchensink.component.html',
  styles: []
})
export class KitchenSinkComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  constructor(private _fsApi: FsApi, private _router: Router) {}

  public ngOnInit() {

    this.config = {
      paging: {
        limits: [5, 15, 50, 150, 250, 500, 1000]
      },
      filters: [
        {
          name: 'keyword',
          type: 'text',
          label: 'Search'
        },
        {
          name: 'simple_select',
          type: 'select',
          label: 'Simple Select',
          values: () => {
            return [
              { name: 'All', value: '__all' },
              { name: 'Option 1', value: 1 },
              { name: 'Option 2', value: 2 },
              { name: 'Option 3', value: 3 }
            ];
          }
        }
      ],
      actions: [
        {
          click: (event) => {
            console.log(event);
          },
          label: 'Primary Button'
        },
        {
          click: (event) => {
            console.log(event);
          },
          icon: 'delete',
          primary: false,
          label: 'Secondary Button'
        }
      ],
      rowActions: [
        {
          click: (row, event) => {
            console.log('edit', row, event);
          },
          icon: 'edit',
          label: 'Edit'
        },
        {
          click: (row, event) => {
            console.log('delete', row, event);
          },
          icon: 'delete',
          label: 'Remove'
        }
      ],
      rowEvents:
      {
        hover: function(event) {

        },
        click: function(event) {

        }
      },
      header: {
        className: 'header-test-defaults-class',
        align: 'left'
      },
      cell: {
        className: 'cell-test-defaults-class',
        align: 'left'
      },
      fetch: (query) => {
        query.count = 500;
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .map(response => ({ data: response.data.objects, paging: response.data.paging }));
      },
      // initialFetch: false,
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
