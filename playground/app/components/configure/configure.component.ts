import { Component, Inject } from '@angular/core';
import { DrawerRef, DRAWER_DATA } from '@firestitch/drawer';
import { FsListComponent, FsListConfig } from '@firestitch/list';
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

  constructor(public drawer: DrawerRef<ConfigureComponent>,
              @Inject(DRAWER_DATA) public data: any) {
    this.config = data.config;
    this.defaultConfig = data.defaultConfig;
    this.list = data.list;
    this.pagingStrategy = this.config.paging.strategy;
  }

  reload() {
    this.list.config = this.config;
  }

  pagingChange(pagingStrategy) {
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
}
