import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FsApi } from '@firestitch/api';

import { FsListConfig } from '../../../../src/app/models/list-config.model';

import 'rxjs/add/operator/map';

@Component({
  selector: 'pl-list',
  templateUrl: 'list.component.html',
  styles: []
})
export class ListComponent implements OnInit {

  public config: FsListConfig;

  constructor(private _fsApi: FsApi, private _router: Router) {
  }

  public ngOnInit() {

    // FsList
    // instance
    // controller

    // this.fslist = FsList.create({...})
    //<fs-list [fsList]="fsList">
    //<fs-list [controller]="controller">

    this.config = FsListConfig.create({
      //inlineFilters: true,
      paging: {
        enabled: true,
        //limit: 250,
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
      data: (query) => {
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
    });
  }

  public onClick(event, row) {

    //this.config.reload();
    console.log(event, row);
  }

  public proceed(link) {
    this._router.navigateByUrl(link);
  }
}
