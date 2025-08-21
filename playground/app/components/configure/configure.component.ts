import { Component, Inject } from '@angular/core';

import { DRAWER_DATA, DrawerRef } from '@firestitch/drawer';
import { FsListComponent, PaginationStrategy } from '@firestitch/list';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FsLabelModule } from '@firestitch/label';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
    templateUrl: './configure.component.html',
    styleUrls: ['./configure.component.scss'],
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        FormsModule,
        FsLabelModule,
        MatSelect,
        MatOption,
        MatCheckbox,
    ],
})
export class ConfigureComponent {

  public config;
  public defaultConfig;
  public list: FsListComponent;
  public paginationStrategy = PaginationStrategy;
  public pagingStrategy = false;
  public loadMoreEnabled = false;

  constructor(
    public drawer: DrawerRef<ConfigureComponent>,
    @Inject(DRAWER_DATA) public data: any,
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
