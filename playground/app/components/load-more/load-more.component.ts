import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { FsApi } from '@firestitch/api';
import { ItemType } from '@firestitch/filter';
import { FsListComponent, FsListConfig, PaginationStrategy } from '@firestitch/list';

import { map } from 'rxjs/operators';

import { ApiStrategy } from '../../services/api-strategy.service';


@Component({
  selector: 'load-more',
  templateUrl: './load-more.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreComponent implements OnInit {

  @ViewChild('table', { static: true })
  public table: FsListComponent; // Controller fs-list
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
      filters: [
        {
          name: 'keyword',
          type: ItemType.Keyword,
          label: 'Search',
        },
      ],
      paging: {
        strategy: PaginationStrategy.Offset,
        limit: 3,
      },
      loadMore: true,
      fetch: (query) => {
        query.count = 30;
        const genders = ['men', 'women'];

        return this._fsApi.get('dummy', query)
          .pipe(
            map((response) => {
              response.objects.forEach((obj) => {
                const gender = genders[this.randomInteger(0, 1)];
                obj.avatar = `http://api.randomuser.me/portraits/${  gender  }/${  this.randomInteger(1, 99)  }.jpg`;
              });

              return { data: response.objects, paging: response.paging };
            }),
          );
      },
    };
  }

  private randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);

    return rand;
  }
}
