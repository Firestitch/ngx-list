import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FsFilterModule } from '@firestitch/filter';

import { FsCellComponent } from './app/components/cell/cell.component';
import { FsListComponent } from './app/components/list/list.component';
import { FsStatusComponent } from './app/components/status/status.component';
import { FsRowComponent } from './app/components/row/row.component';

export * from './app/components/list/list.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FsFilterModule,
    FlexLayoutModule
  ],
  declarations: [
    FsListComponent,
    FsCellComponent,
    FsStatusComponent,
    FsRowComponent,
    FsCellComponent,
  ],
  providers: [
  ],
  exports: [
    FsListComponent,
    FsRowComponent,
    FsCellComponent
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
