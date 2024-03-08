import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { SelectionActionType } from '@firestitch/selection';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ApiStrategy } from '../../services/api-strategy.service';
import { StrategyBaseComponent } from '../examples/strategy-base/strategy-base.component';


@Component({
  selector: 'selection',
  templateUrl: './selection.component.html',
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
      trackBy: 'name',
      status: true,
      filterInput: true,
      queryParam: false,
      persist: false,
      selection: {
        selectAll: true,
        actions: [
          {
            type: SelectionActionType.Action,
            name: 'delete',
            label: 'Delete',
          },
          {
            type: SelectionActionType.Select,
            label: 'Change Status To',
            values: [
              {
                name: 'TODO',
                value: '1',
              },
              {
                name: 'Done',
                value: '2',
              },
            ],
          },
        ],
        actionSelected: (action) => {
          return of(true).pipe(
            delay(2000),
          );
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
                label: 'Custom Action',
              },
            ]);
          }
          if (selectionRef) {
            selectionRef.resetActions();
          }

        },
      },
      paging: {
        limits: [5, 15, 50],
      },
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
      ],
      fetch: (query) => {
        query.count = 500;

        return this._fsApi.get('https://specify.firestitch.dev/api/dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
    };
  }

  public onClick(row, event) {
    console.log(row, event);
  }
}
