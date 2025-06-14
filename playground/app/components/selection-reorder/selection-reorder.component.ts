import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig, ReorderPosition } from '@firestitch/list';
import { SelectionActionType } from '@firestitch/selection';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ApiStrategy } from '../../services/api-strategy.service';
  

@Component({
  selector: 'selection-reorder',
  templateUrl: './selection-reorder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionReorderComponent implements OnInit {

  @ViewChild('table', { static: true })
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  constructor(
    protected _apiStrategy: ApiStrategy,
    private _fsApi: FsApi,
  ) {
  }

  public ngOnInit() {
    this.config = {
      trackBy: 'name',
      status: false,
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

          console.log(action);

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
      reorder: {
        position: ReorderPosition.Left,
        start: () => {
          // console.log('reorder started');
        },
        moved: (data) => {
          // console.log('reorder moved', data);
        },
        done: (data) => {
          // console.log('reorder finished', data);
        },
        multiple: true,
      },
      fetch: (query) => {
        query.limit = 10;
        query.count = 10;

        return this._fsApi.get('dummy', query)
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
