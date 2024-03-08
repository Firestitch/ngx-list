import { Component, OnInit, ViewChild } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListAbstractRow, FsListComponent, FsListConfig, PaginationStrategy } from '@firestitch/list';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ApiStrategy } from '../../../services/api-strategy.service';
import { StrategyBaseComponent } from '../../examples/strategy-base/strategy-base.component';


@Component({
  selector: 'remove-confirm',
  templateUrl: 'confirm.component.html',
  styles: []
})
export class RemoveConfirmComponent extends StrategyBaseComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  constructor(
    protected _apiStrategy: ApiStrategy,
    private _fsApi: FsApi
  ) {
    super(_apiStrategy);
  }

  public ngOnInit() {

    this.config = {
      heading: 'Remove',
      subheading: 'Remove action with list integrated confirmation or click on row for delete',
      status: false,
      filterInput: true,
      queryParam: false,
      persist: false,
      paging: {
        limits: [5, 15, 50],
        strategy: PaginationStrategy.Page,
      },
      actions: [
        {
          label: 'Update Row (Object 3)',
          click: () => {
            this.table.updateData(
              { name: 'Object 3 Updated' },
              (listRow: FsListAbstractRow) => {
                return listRow.name === 'Object 3';
              }
            );
          }
        },
        {
          label: 'Remove Row (Object 2)',
          click: () => {
            this.table.removeData(
              (listRow: FsListAbstractRow) => {
                return listRow.name === 'Object 2';
              }
            );
          }
        }
      ],
      rowEvents: {
        click: ({ row }) => {
          this.table.removeData([row]);
        }
      },
      rowActions: [
        {
          click: (row, event) => {
            // If Observable will be returnet List will wait till it isn't completed
            return of(1)
              .pipe(
                delay(2000),
              )
          },
          remove: {
            title: 'Confirm',
            template: 'Are you sure you would like to delete this record?',
          },
          icon: 'delete',
          label: 'Remove'
        }
      ],
      fetch: (query) => {
        query.count = 500;
        return this._fsApi.get('https://specify.firestitch.dev/api/dummy', query)
          .pipe(
            map(response => ({ data: response.objects, paging: response.paging })),
          );
      },
    };
  }
}
