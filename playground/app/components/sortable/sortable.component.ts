import { Component, OnInit, ViewChild, inject } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig } from '@firestitch/list';

import { map } from 'rxjs/operators';
import { FsListComponent as FsListComponent_1 } from '../../../../src/app/components/list/list.component';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListHeaderDirective } from '../../../../src/app/directives/header/header.directive';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';


@Component({
    selector: 'sortable',
    templateUrl: './sortable.component.html',
    standalone: true,
    imports: [
        FsListComponent_1,
        FsListColumnDirective,
        FsListHeaderDirective,
        FsListCellDirective,
    ],
})
export class SortableComponent implements OnInit {
  private _fsApi = inject(FsApi);


  @ViewChild('table', { static: true })
  public table: FsListComponent;
  public config: FsListConfig;

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
