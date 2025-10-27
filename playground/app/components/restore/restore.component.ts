import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import { ActionType, FsListComponent, FsListConfig } from '@firestitch/list';

import { map } from 'rxjs/operators';

import { ApiStrategy } from '../../services/api-strategy.service';
import { FsListComponent as FsListComponent_1 } from '../../../../src/app/components/list/list.component';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListHeaderDirective } from '../../../../src/app/directives/header/header.directive';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';
import { FsListFooterDirective } from '../../../../src/app/directives/footer/footer.directive';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'restore',
    templateUrl: './restore.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FsListComponent_1,
        FsListColumnDirective,
        FsListHeaderDirective,
        FsListCellDirective,
        FsListFooterDirective,
        RouterLink,
    ],
})
export class RestoreComponent implements OnInit {
  protected _apiStrategy = inject(ApiStrategy);
  private _fsApi = inject(FsApi);


  @ViewChild('table', { static: true })
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  public ngOnInit() {

    this.config = {
      status: true,
      queryParam: false,
      persist: false,
      restore: {
        query: { state: 'deleted' },
        menuLabel: 'Restore',
        click: (row, event) => {
          console.log('Restore', row, event);
        },
        reload: true,
      },
      paging: {
        limits: [5, 15, 50, 150, 250, 500, 1000],
      },
      rowActions: [
        {
          click: (row, event) => {
            console.log('Delete', row, event);
          },
          menu: true,
          label: 'Delete',
          type: ActionType.Basic,
        },
      ],
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
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

  public onClick(row, event) {
    console.log(row, event);
  }
}
