import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsFilterModule } from '@firestitch/filter';
import { FsScrollModule } from '@firestitch/scroll';
import { merge } from 'lodash';


import {
  FsCellComponent,
  FsListComponent,
  FsStatusComponent,
  FsRowComponent,
  FsBodyComponent,
  FsHeadCellComponent,
  FsHeadComponent,
  FsPaginationComponent,
  FsFooterComponent,
  FsFooterRowComponent,
  FsFooterCellComponent,
} from './app/components';

import {
  FsListColumnDirective,
  FsListCellDirective,
  FsListHeaderDirective,
  FsListFooterDirective,
} from './app/directives';
import { FS_LIST_DEFAULT_CONFIG } from './fslist.providers';
import { FsListConfig } from './app/interfaces';

export * from './app/components/list/list.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    FsFilterModule,
    FlexLayoutModule,
    FsScrollModule,
  ],
  declarations: [
    // Components
    FsListComponent,
    FsRowComponent,
    FsCellComponent,
    FsFooterRowComponent,
    FsFooterCellComponent,

    // Internal Components
    FsStatusComponent,
    FsHeadComponent,
    FsHeadCellComponent,
    FsBodyComponent,
    FsFooterComponent,
    FsPaginationComponent,

    // Directives
    FsListColumnDirective,
    FsListCellDirective,
    FsListHeaderDirective,
    FsListFooterDirective,
  ],
  providers: [
  ],
  exports: [
    FsListComponent,
    FsRowComponent,
    FsCellComponent,
    FsListColumnDirective,
    FsListCellDirective,
    FsListHeaderDirective,
    FsListFooterDirective,
  ]
})
export class FsListModule {
  static forRoot(config: FsListConfig = {}): ModuleWithProviders {
    return {
      ngModule: FsListModule,
      providers: [
        {
          provide: FS_LIST_DEFAULT_CONFIG,
          useValue: merge({ noResults: { message: 'No Results Found' } }, config)
        }
      ]
    };
  }
}
