import { Component, Inject } from '@angular/core';
import { DrawerRef, DRAWER_DATA } from '@firestitch/drawer';
import { FsListComponent } from '@firestitch/list';
import { PaginationStrategy } from '@firestitch/list';


@Component({
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent {

  public config;
  public defaultConfig;
  public list: FsListComponent;
  public paginationStrategy = PaginationStrategy;
  public pagingStrategy = false;
  public loadMoreEnabled = false;

  public constructor(
    public drawer: DrawerRef<ConfigureComponent>,
    @Inject(DRAWER_DATA) public data: any
  ) {
    this.config = data.config;
    this.defaultConfig = data.defaultConfig;
    this.list = data.list;
    this.pagingStrategy = this.config.paging.strategy;

    this.loadMoreEnabled = !!this.config.loadMoreOffsetStrategy;
  }

  public reload() {
    this.list.config = this.config;
  }

  public pagingChange(pagingStrategy) {
    if (!pagingStrategy) {
      this.config.paging = false;
    } else {
      if (!this.config.paging) {
        this.config.paging = this.defaultConfig.paging;
      }

      this.config.paging.strategy = pagingStrategy;
    }

    this.reload();
  }

  public loadMore(event) {
    this.config.paging.loadMore = event.checked ? {} : null;

    this.reload();
  }
}
