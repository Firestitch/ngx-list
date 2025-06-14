import { Component, OnInit, ViewChild } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig } from '@firestitch/list';

import { map } from 'rxjs/operators';


@Component({
  selector: 'sortable',
  templateUrl: './sortable.component.html',
})
export class SortableComponent implements OnInit {

  @ViewChild('table', { static: true })
  public table: FsListComponent;
  public config: FsListConfig;

  constructor(private _fsApi: FsApi) { }

  public ngOnInit() {

    this.config = {
      heading: 'Sortable',
      status: true,
      queryParam: false,
      persist: false,
      sorts: [
        {
          name: 'Last Login',
          value: 'last_login',
        },
        {
          name: 'User Rating',
          value: 'user_rating',
          direction: 'desc',
        },
      ],
      paging: {
        limits: [5, 15, 50, 150, 250, 500, 1000],
      },
      fetch: (query) => {
        query.count = 3;
        query.limit = 3;

        return this._fsApi.get('dummy', query)
          .pipe(
            map((response) => ({ data: response.objects, paging: response.paging })),
          );
      },
    };
  }
}
