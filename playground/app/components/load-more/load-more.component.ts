import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { FsListConfig } from '@firestitch/list';

import { map } from 'rxjs/operators';

import { ApiStrategy } from '../../services/api-strategy.service';


@Component({
  selector: 'load-more',
  templateUrl: './load-more.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreComponent implements OnInit {

  public config: FsListConfig;

  public roles = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'moderator', viewValue: 'Moderator' },
    { value: 'user', viewValue: 'User' },
  ];

  constructor(
    protected _apiStrategy: ApiStrategy,
    private _fsApi: FsApi,
  ) {
  }

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
