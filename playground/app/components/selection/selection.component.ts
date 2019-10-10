import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { SelectionActionType } from '@firestitch/selection';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ItemType } from '@firestitch/filter';

import { ApiStrategy } from '../../services/api-strategy.service';
import { StrategyBaseComponent } from '../examples/strategy-base/strategy-base.component';


@Component({
  selector: 'selection',
  templateUrl: 'selection.component.html',
  styles: []
})
export class SelectionComponent extends StrategyBaseComponent implements OnInit {

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
      heading: 'Selection',
      trackBy: 'name',
      status: true,
      filterInput: true,
      selection: {
        selectAll: true,
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
        actionSelected: (action) => {

          console.log(action);

          return of(true).pipe(
            delay(2000),
          )
        },
        allSelected: () => {
        },
        cancelled: () => {
        },
        selectionChanged: (data, allSelected, selectionRef) => {
          if (data.find((row) => row.name === 'Object 1')) {
            return of([
              {
                type: SelectionActionType.Action,
                value: 'custom',
                label: 'Custom Action'
              },
            ])
          } else {
            if (selectionRef) {
              selectionRef.resetActions();
            }
          }
        }
      },
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
            map(response => ({ data: response.data.objects, paging: response.data.paging }))
          );
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
