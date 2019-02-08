import { Component, OnInit, ViewChild } from '@angular/core';
import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig } from '../../../../src';
import 'rxjs/add/operator/map';

@Component({
  selector: 'filters-extended',
  templateUrl: 'filters-extended.component.html',
  styles: []
})
export class FiltersExtendedComponent implements OnInit {

  @ViewChild('table')
  public table: FsListComponent;
  public config: FsListConfig;

  constructor(private _fsApi: FsApi) {}

  public ngOnInit() {

    this.config = {
      heading: 'Filters extended',
      status: false,
      sorts: [
        {
          name: 'Last Login',
          value: 'last_login',
        },
      ],
      sort: 'last_login,desc',
      filters: [
        {
          name: 'keyword',
          type: 'text',
          label: 'Search'
        },
        {
          name: 'simple_select',
          type: 'select',
          label: 'Simple Select',
          values: () => {
            return [
              { name: 'All', value: '__all' },
              { name: 'Option 1', value: 1 },
              { name: 'Option 2', value: 2 },
              { name: 'Option 3', value: 3 }
            ];
          }
        }
      ],
      fetch: (query) => {
        query.count = 3;
        query.limit = 3;
        return this._fsApi.get('https://boilerplate.firestitch.com/api/dummy', query)
          .map(response => ({ data: response.data.objects, paging: response.data.paging }));
      },
      paging: false,
    };
  }
}
