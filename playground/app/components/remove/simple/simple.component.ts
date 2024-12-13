import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig, PaginationStrategy } from '@firestitch/list';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { ApiStrategy } from '../../../services/api-strategy.service';


@Component({
  selector: 'remove-simple',
  templateUrl: './simple.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemoveSimpleComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  constructor(
    protected _apiStrategy: ApiStrategy,
    private _fsApi: FsApi,
  ) {
  }

  public ngOnInit() {

    this.config = {
      //heading: 'Removess',
      //subheading: 'Remove action without confirmation',
      status: false,
      queryParam: false,
      persist: false,
      trackBy: 'name',
      paging: {
        limits: [5, 15, 50],
        strategy: PaginationStrategy.Page,
      },
      actions: [

        {
          label: 'Remove Row (Object 2)',
          click: () => {
            this.table.removeData(
              (listRow: any) => {
                return listRow.name === 'Object 2';
              },
            );
          },
        },
      ],
      rowActions: [
        {
          click: (row, event) => {

            // If Observable will be returnet List will wait till it isn't completed
            return of(1)
              .pipe(
                delay(2000),
              );
          },
          remove: true,
          icon: 'delete',
          label: 'Remove',
        },
      ],
      fetch: (query) => {
        query.count = 500;

        return this._fsApi.get('dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
    };

  }
}
