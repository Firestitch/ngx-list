import { Component, OnInit, ViewChild } from '@angular/core';
import { FsApi } from '@firestitch/api';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { FsListConfig, PaginationStrategy } from '../../../../../src';
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
      subheading: 'Remove action with list integrated confirmation',
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
              (listRow: any) => {
                return listRow.name === 'Object 3';
              }
            );
          }
        },
        {
          label: 'Delete Row (Object 2)',
          click: () => {
            this.table.deleteData(
              { name: 'Object 2' },
              (listRow: any, targetRow: any) => {
                return listRow.name === targetRow.name;
              }
            );
          }
        }
      ],
      rowActions: [
        {
          click: (row, event) => {
            alert('Deleted');
            console.log('delete', row, event);

            // If Observable will be returnet List will wait till it isn't completed
            return of()
              .pipe(
                delay(2000),
              )
          },
          menu: true,
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
