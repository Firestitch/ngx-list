import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FsFilterModule } from '@firestitch/filter';
import { FsScrollModule } from '@firestitch/scroll';
import { FsMenuModule } from '@firestitch/menu';
import { FsPromptModule } from '@firestitch/prompt';

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
import { FS_LIST_DEFAULT_CONFIG, FS_LIST_CONFIG } from './fslist.providers';
import { FsListConfig } from './app/interfaces';
import { FsActionsComponent } from './app/components/actions/actions.component';

export * from './app/components/list/list.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    FsFilterModule,
    FsMenuModule,
    FlexLayoutModule,
    FsScrollModule,
    FsPromptModule,
  ],
  declarations: [
    // Components
    FsListComponent,
    FsRowComponent,
    FsCellComponent,
    FsFooterRowComponent,
    FsFooterCellComponent,
    FsStatusComponent,

    // Internal Components
    FsActionsComponent,
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
        { provide: FS_LIST_CONFIG, useValue: config },
        {
          provide: FS_LIST_DEFAULT_CONFIG,
          useFactory: FsListConfigFactory,
          deps: [FS_LIST_CONFIG]
        }
      ]
    };
  }
}

export function FsListConfigFactory(config: FsListConfig) {
  return merge({ noResults: { message: 'No Results Found' }}, config);
}
