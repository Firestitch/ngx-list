import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FsApi } from '@firestitch/api';
import { FsListConfig } from '../../../../src';
import 'rxjs/add/operator/map';

@Component({
  selector: 'kitchensink',
  templateUrl: 'kitchensink.component.html',
  styles: []
})
export class KitchenSinkComponent implements OnInit {

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
          primary: true,
          label: 'Secondary Button'
        }
      ],
      rowActions: [
        {
          click: (event) => {
            console.log('edit', event);
          },
          icon: 'edit',
          label: 'Edit'
        },
        {
          click: (event) => {
            console.log('delete', event);
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
      columnDefaults: {
        headerClass: ['header-test-defaults-class'],
        sortable: true,
        headerAlign: 'left',
        cellAlign: 'left',
        cellClass: ['cell-test-defaults-class'],
        colClass: ['col-test-class']
      },
      fetch: (query) => {
        query.count = 500;
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .map(response => ({ data: response.data.objects, paging: response.data.paging }));
      }
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
