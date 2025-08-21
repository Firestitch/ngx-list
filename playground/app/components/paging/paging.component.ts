import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';


import { ItemType } from '@firestitch/filter';
import { FsListConfig, PaginationStrategy } from '@firestitch/list';

import { Observable } from 'rxjs';
import { FsListComponent } from '../../../../src/app/components/list/list.component';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListHeaderDirective } from '../../../../src/app/directives/header/header.directive';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';


@Component({
    templateUrl: './paging.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsListComponent,
        FsListColumnDirective,
        FsListHeaderDirective,
        FsListCellDirective,
    ],
})
export class PagingComponent implements OnInit {

  @ViewChild('table', { static: true })
  public config: FsListConfig;

  constructor() {}

  public ngOnInit() {

    this.config = {
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
      ],
      paging: {
        strategy: PaginationStrategy.Page,
      },
      heading: 'No Results',
      fetch: () => {
        return new Observable((observer) => {
          observer.next({ data: [{ guid: 'sss' }], paging: {} });
          observer.complete();
        });
      },
    };
  }
}
