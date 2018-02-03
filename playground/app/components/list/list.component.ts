import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FsApi } from '@firestitch/api';

import { IFsListConfig } from '../../../../src/app/interfaces';

import 'rxjs/add/operator/map';

@Component({
  selector: 'pl-list',
  templateUrl: 'list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

  public config: IFsListConfig;
  // public localDataSourceConfig: IFsListConfig;
  public rows = [
    {name: 'Object 1', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'},
    {name: 'Object 2', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'},
    {name: 'Object 3', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'},
    {name: 'Object 4', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'},
    {name: 'Object 5', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'},
    {name: 'Object 6', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'},
    {name: 'Object 7', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'}
  ];

  constructor(private _fsApi: FsApi, private _router: Router) {
  }

  public ngOnInit() {

    this.config = this.buildRemoteDataSourceConfig();
  }

  get columnDefaults() {
    return {
      headerClass: ['header-test-defaults-class'],
      sortable: true,
      headerAlign: 'left',
      cellAlign: 'left',
      cellClass: ['cell-test-defaults-class'],
      colClass: ['col-test-class']
    };
  }

  get listFilters() {
    return [
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
    ]
  }

  get listPaging() {
    return {
      limits: [5, 15, 50, 150, 250, 500, 1000]
    };
  }

  get listLocalPaging() {
    return {
      enabled: true,
      manual: true,
      limits: [5, 15, 50, 150, 250, 500, 1000]
    };
  }

  public buildRemoteDataSourceConfig() {
    return {
      paging: this.listPaging,
      filters: this.listFilters,
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
          label: 'Secondary Button'
        }
      ],
      rowActions: [
        {
          click: (event) => {
            console.log(event);
          },
          icon: 'edit'
        },
        {
          click: (event) => {
            console.log(event);
          },
          icon: 'delete'
        }
      ],
      rowEvents: [
        {
          hover: function(event) {

          },
          click: function(event) {

          }
        }
      ],
      columnDefaults: this.columnDefaults,
      fetch: (query) => {
        query.count = 500;

        // Connect to dummy api and disply the data
        // we need to return 3 types of data
        // 1. the array of data that is displayed
        // 2. The paging object { data: [], paging: { limit: 10, page: 1, pages: 1, records: 50 } }
        // 3. global data that can be applied to the footer templates (dont worry about this one for now)
        // so we can return an FsResult object that is populate from the api response
        // or some other structure. Think about this and also take a look at the Angular 1 implementaion.

        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .map(response => ({ data: response.data.objects, paging: response.data.paging }));
      }
    };
  }

  // public buildLocalDataSourceConfig() {
  //   return FsListConfig.create({
  //     paging: this.listLocalPaging,
  //     filters: this.listFilters,
  //     actions: [
  //       {
  //         click: (event) => {
  //           console.log(event);
  //         },
  //         label: 'Primary Button'
  //       },
  //       {
  //         click: (event) => {
  //           console.log(event);
  //         },
  //         label: 'Secondary Button'
  //       }
  //     ],
  //     rowActions: [
  //       {
  //         click: (event) => {
  //           console.log(event);
  //         },
  //         icon: 'edit'
  //       },
  //       {
  //         click: (event) => {
  //           console.log(event);
  //         },
  //         icon: 'delete'
  //       }
  //     ],
  //     rowEvents: [
  //       {
  //         hover: function(event) {
  //
  //         },
  //         click: function(event) {
  //
  //         }
  //       }
  //     ],
  //     columnDefaults: this.columnDefaults
  //   });
  // }

  public onClick(event, row) {
    console.log(event, row);
  }

  public proceed(link) {
    this._router.navigateByUrl(link);
  }

  /*public addRows() {
    this.rows.push(
        {name: 'Object 8', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'},
        {name: 'Object 9', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'},
        {name: 'Object 10', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'},
        {name: 'Object 11', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'},
        {name: 'Object 12', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'},
        {name: 'Object 13', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'},
        {name: 'Object 14', date: '1970-09-15T02:03:44+00:00', guid: '85821c48f3ee78ebf2caa03bc5da1cea'}
      );
  }*/
}
