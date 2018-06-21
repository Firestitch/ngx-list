import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsFilterModule } from '@firestitch/filter';
import { FsScrollModule } from '@firestitch/scroll';

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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsListModule,
      providers: [
        FsListComponent
      ]
    };
  }
}
