import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListConfig } from '@firestitch/list';

import { map } from 'rxjs/operators';

import { ApiStrategy } from '../../services/api-strategy.service';
import { FsListComponent } from '../../../../src/app/components/list/list.component';
import { FsListColumnDirective } from '../../../../src/app/directives/column/column.directive';
import { FsListHeaderDirective } from '../../../../src/app/directives/header/header.directive';
import { FsListCellDirective } from '../../../../src/app/directives/cell/cell.directive';


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
  protected _apiStrategy = inject(ApiStrategy);
  private _fsApi = inject(FsApi);


  public config: FsListConfig;

  public roles = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'moderator', viewValue: 'Moderator' },
    { value: 'user', viewValue: 'User' },
  ];

  public ngOnInit() {

    this.config = {
      loadMore: true,
      fetch: (query) => {
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
