import { Component, OnInit, ViewChild } from '@angular/core';
import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig } from '@firestitch/list';
import { map } from 'rxjs/operators';
import { ItemType } from '@firestitch/filter';


@Component({
  selector: 'filters-extended',
  templateUrl: 'filters-extended.component.html',
  styles: []
})
export class FiltersExtendedComponent implements OnInit {

  @ViewChild('table', { static: true })
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
      sort: {
        value: 'last_login',
        direction: 'desc',
      },
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search'
        },
        {
          name: 'simple_select',
          type: ItemType.Select,
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
        return this._fsApi.get('https://specify.dev.firestitch.com/api/dummy', query)
          .pipe(
            map(response => ({ data: response.objects, paging: response.paging })),
          );
      },
      paging: false,
    };
  }
}
