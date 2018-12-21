import { Component, OnInit, ViewChild } from '@angular/core';
import { FsApi } from '@firestitch/api';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { FsListAbstractRow, FsListConfig, PaginationStrategy } from '../../../../../src';
import { FsListComponent } from '../../../../../src/app/components/list';

import 'rxjs/add/operator/map';


@Component({
  selector: 'remove-confirm',
  templateUrl: 'confirm.component.html',
  styles: []
})
export class RemoveConfirmComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  constructor(private _fsApi: FsApi) {}

  public ngOnInit() {

    this.config = {
      heading: 'Remove',
      subheading: 'Remove action with list integrated confirmation or click on row for delete',
      status: false,
      filterInput: true,
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
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .map(response => ({ data: response.data.objects, paging: response.data.paging }));
      },
    };
  }
}
