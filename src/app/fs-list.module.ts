import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FsFilterModule } from '@firestitch/filter';
import { FsScrollModule } from '@firestitch/scroll';
import { FsMenuModule } from '@firestitch/menu';
import { FsPromptModule } from '@firestitch/prompt';

import { merge } from 'lodash-es';

// Components
import { FsListComponent } from './components/list/list.component';
import { FsBodyComponent } from './components/body/body.component';
import { FsRowComponent } from './components/body/row/row.component';
import { FsCellComponent } from './components/body/row/cell/cell.component';
import { FsHeadComponent } from './components/head/head.component';
import { FsHeadCellComponent } from './components/head/head-cell/head-cell.component';
import { FsFooterComponent } from './components/footer/footer.component';
import { FsFooterRowComponent } from './components/footer/footer-row/footer-row.component';
import { FsFooterCellComponent } from './components/footer/footer-row/footer-cell/footer-cell.component';
import { FsStatusComponent } from './components/status/status.component';
import { FsActionsComponent } from './components/actions/actions.component';
import { FsPaginationComponent } from './components/pagination/pagination.component';
import { CustomizeColsDialogComponent } from './components/customize-cols/customize-cols.component';

// Directives
import { FsListFooterDirective } from './directives/footer/footer.directive';
import { FsListColumnDirective } from './directives/column/column.directive';
import { FsListCellDirective } from './directives/cell/cell.directive';
import { FsListHeaderDirective } from './directives/header/header.directive';
import { FsListGroupCellDirective } from './directives/group-cell/group-cell.directive';
import { FsListExpandTriggerDirective } from './directives/expand-trigger/expand-trigger.directive';

import { FS_LIST_DEFAULT_CONFIG, FS_LIST_CONFIG } from './fs-list.providers';
import { FsListConfig } from './interfaces';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatRippleModule,
    FsFilterModule,
    FsMenuModule,
    FlexLayoutModule,
    FsScrollModule,
    FsPromptModule,
    MatDialogModule,
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
    FsListGroupCellDirective,
    FsListExpandTriggerDirective,

    // Dialog
    CustomizeColsDialogComponent,
  ],
  entryComponents: [
    // Dialog
    CustomizeColsDialogComponent,
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
    FsListGroupCellDirective,
    FsListExpandTriggerDirective
  ],
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
