import { Component, OnInit, ViewChild } from '@angular/core';
import { FsApi } from '@firestitch/api';
import { FsListComponent, FsListConfig, PaginationStrategy } from '@firestitch/list';
import { map } from 'rxjs/operators';
import { StrategyBaseComponent } from '../examples/strategy-base/strategy-base.component';
import { ApiStrategy } from '../../services/api-strategy.service';


@Component({
  selector: 'load-more',
  templateUrl: 'load-more.component.html',
  styles: []
})
export class LoadMoreComponent extends StrategyBaseComponent implements OnInit {

  @ViewChild('table', { static: true })
  public table: FsListComponent; // Controller fs-list
  public config: FsListConfig;

  public roles = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'moderator', viewValue: 'Moderator'},
    {value: 'user', viewValue: 'User'}
  ];

  constructor(
    protected _apiStrategy: ApiStrategy,
    private _fsApi: FsApi,
  ) {
    super(_apiStrategy);
  }

  public ngOnInit() {

    this.config = {
      paging: {
        strategy: PaginationStrategy.Offset,
        limit: 3,
      },
      loadMore: true,
      fetch: (query) => {
        query.count = 30;
        const genders = ['men', 'women'];
        return this._fsApi.get('https://specify.dev.firestitch.com/api/dummy', query)
          .pipe(
            map(response => {
              response.data.objects.forEach((obj) => {
                const gender = genders[this.randomInteger(0, 1)];
                obj.avatar = 'http://api.randomuser.me/portraits/' + gender + '/' + this.randomInteger(1, 99) + '.jpg';
              });

              return { data: response.data.objects, paging: response.data.paging };
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
