import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { SelectionActionType } from '@firestitch/selection';

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
            type: SelectionActionType.Action,
            value: 'delete',
            label: 'Delete'
          },
          {
            type: SelectionActionType.Select,
            label: 'Change Status To',
            options: [
              {
                name: 'TODO',
                value: '1'
              },
              {
                name: 'Done',
                value: '2'
              }
            ]
          },
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
