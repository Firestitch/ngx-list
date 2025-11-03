import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import { ActionType, FsListComponent, FsListConfig } from '@firestitch/list';
import { FsMessage } from '@firestitch/message';

import { map } from 'rxjs/operators';

import { FsListComponent as FsListComponent_1 } from '../../../../src/app/components/list/list.component';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListFooterDirective } from '../../../../src/app/directives/footer/footer.directive';
import { FsListHeaderDirective } from '../../../../src/app/directives/header/header.directive';
import { ApiStrategy } from '../../services/api-strategy.service';


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

  @ViewChild('table', { static: true })
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;
  
  protected _apiStrategy = inject(ApiStrategy);
  private _fsApi = inject(FsApi);
  private _message = inject(FsMessage);

  public ngOnInit() {

    this.config = {
      status: true,
      queryParam: false,
      persist: false,
      restore: {
        query: { state: 'deleted' },
        click: (row, event) => {
          console.log('Restore', row, event);
          this._message.success('Clicked restore action');
        },
      },
      paging: {
        limits: [5, 15, 50, 150, 250, 500, 1000],
      },
      rowActions: [
        {
          click: (row, event) => {
            console.log('Delete', row, event);
            this.table.removeData([row]);
          },
          remove: {
            title: 'Delete',
            template: 'Are you sure you would like to delete this record?',
          },
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
