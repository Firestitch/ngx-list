import { Component, OnInit, ViewChild } from '@angular/core';
import { FsApi } from '@firestitch/api';
import { FsListConfig, PaginationStrategy, FsListComponent } from '@firestitch/list';

import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ApiStrategy } from '../../../services/api-strategy.service';
import { StrategyBaseComponent } from '../../examples/strategy-base/strategy-base.component';


@Component({
  selector: 'remove-simple',
  templateUrl: 'simple.component.html',
  styles: []
})
export class RemoveSimpleComponent extends StrategyBaseComponent implements OnInit {

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
              }
            );
          }
        }
      ],
      rowActions: [
        {
          click: (row, event) => {

            // If Observable will be returnet List will wait till it isn't completed
            return of(1)
              .pipe(
                delay(2000),
              )
          },
          remove: true,
          icon: 'delete',
          label: 'Remove'
        }
      ],
      fetch: (query) => {
        query.count = 500;
        return this._fsApi.get('https://specify.dev.firestitch.com/api/dummy', query)
          .pipe(
            map(response => ({ data: response.objects, paging: response.paging }))
          );
      },
    };

  }
}
