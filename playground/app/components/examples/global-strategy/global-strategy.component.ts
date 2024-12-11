import { Component, Inject } from '@angular/core';

import { FS_LIST_DEFAULT_CONFIG, FsListConfig, PaginationStrategy } from '@firestitch/list';

import { ApiStrategy } from '../../../services/api-strategy.service';


@Component({
  selector: 'app-global-strategy',
  templateUrl: './global-strategy.component.html',
  styleUrls: [
    './global-strategy.component.scss',
  ],
})
export class GlobalStrategyComponent {

  public strategies = PaginationStrategy;
  public strategy = PaginationStrategy.Page;

  constructor(
    public apiStrategy: ApiStrategy,
    @Inject(FS_LIST_DEFAULT_CONFIG) private _defaultConfig: FsListConfig,
  ) {}

  public selectStrategy(event) {
    this.apiStrategy.setStrategy(event);
    this._defaultConfig.paging = {};
    this._defaultConfig.paging.strategy = event;
  }
}
