import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsFilterModule } from '@firestitch/filter';

import {
  FsCellComponent,
  FsListComponent,
  FsStatusComponent,
  FsRowComponent,
  FsBodyComponent,
  FsHeadCellComponent,
  FsHeadComponent,
  FsPaginationComponent,
} from './app/components';

import {
  FsListColumnDirective,
  FsListRowTemplateDirective,
} from './app/directives';
import { FsListHeaderTemplateDirective } from './app/directives/header-template/header-template.directive';

export * from './app/components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FsFilterModule,
    FlexLayoutModule
  ],
  declarations: [
    // Components
    FsListComponent,
    FsRowComponent,
    FsCellComponent,

    // Internal Components
    FsStatusComponent,
    FsHeadComponent,
    FsHeadCellComponent,
    FsBodyComponent,
    FsPaginationComponent,

    // Directives
    FsListColumnDirective,
    FsListRowTemplateDirective,
    FsListHeaderTemplateDirective,
  ],
  providers: [
  ],
  exports: [
    FsListComponent,
    FsRowComponent,
    FsCellComponent,
    FsListColumnDirective,
    FsListRowTemplateDirective,
    FsListHeaderTemplateDirective,
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
