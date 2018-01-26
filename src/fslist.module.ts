import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsFilterModule } from '@firestitch/filter';

import { FsCellComponent } from './app/components/cell/cell.component';
import { FsListComponent } from './app/components/list/list.component';
import { FsStatusComponent } from './app/components/status/status.component';
import { FsRowComponent } from './app/components/row/row.component';
import { FsListColumnDirective } from './app/components/column/column.component';
import { FsListRowTemplateDirective } from './app/directives';
import { FsBodyComponent } from './app/components';
import { FsHeadCellComponent } from './app/components/head-cell/head-cell.component';
import { FsHeadComponent } from './app/components/head/head.component';

export * from './app/components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FsFilterModule,
    FlexLayoutModule
  ],
  entryComponents: [
    FsRowComponent,
  ],
  declarations: [
    FsListComponent,
    FsBodyComponent,
    FsCellComponent,
    FsStatusComponent,
    FsRowComponent,
    FsCellComponent,
    FsListColumnDirective,
    FsListRowTemplateDirective,
    FsHeadComponent,
    FsHeadCellComponent,
  ],
  providers: [
  ],
  exports: [
    FsListComponent,
    FsRowComponent,
    FsCellComponent,
    FsListColumnDirective,
    FsListRowTemplateDirective,
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
