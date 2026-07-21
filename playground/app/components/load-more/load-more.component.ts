import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListConfig } from '@firestitch/list';

import { map } from 'rxjs/operators';

import { FsListComponent } from '../../../../src/app/components/list/list.component';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListHeaderDirective } from '../../../../src/app/directives/header/header.directive';
import { ApiStrategy } from '../../services/api-strategy.service';


@Component({
  selector: 'load-more',
  templateUrl: './load-more.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FsListComponent,
    FsListColumnDirective,
    FsListHeaderDirective,
    FsListCellDirective,
  ],
})
export class LoadMoreComponent implements OnInit {

  public config: FsListConfig;

  public roles = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'moderator', viewValue: 'Moderator' },
    { value: 'user', viewValue: 'User' },
  ];

  protected _apiStrategy = inject(ApiStrategy);
  private _fsApi = inject(FsApi);

  public ngOnInit() {

    this.config = {
      loadMore: true,
      fetch: (query) => {
        query.count = 20;

        return this._fsApi.get('dummy', query)
          .pipe(
            map((response) => {
              return { data: response.objects, paging: response.paging };
            }),
          );
      },
    };
  }
}
