import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { FsListConfig, FsListComponent } from '@firestitch/list';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';


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
      selection: {
        actions: [
          {
            tooltip: 'Delete',
            value: 'delete',
            icon: 'delete'
          },
          {
            icon: 'more_vert',
            options: [
              {
                name: 'Move to Section',
                value: 'move',
                options: [
                  {
                    name: 'Section A',
                    value: 'sectiona'
                  },
                  {
                    name: 'Section B',
                    value: 'sectionb'
                  },
                  {
                    name: 'Section C',
                    value: 'sectionc'
                  }
                ]
              },
              {
                name: 'Archive',
                value: 'archive',
              }
            ]
          }
        ],
        onAction: (action) => {

          console.log(action);

          return of(true).pipe(
            delay(2000),
          )
        },
        onSelectAll: () => {
        },
        onCancel: () => {
        }
      },
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
          .pipe(
            map(response => ({ data: response.data.objects, paging: response.data.paging }))
          );
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
