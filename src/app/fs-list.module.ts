import { ModuleWithProviders, NgModule } from '@angular/core';


import { FsBodyComponent } from './components/body/body.component';
import { FsRowActionsComponent } from './components/body/row/actions/actions.component';
import { FsCellComponent } from './components/body/row/cell/cell.component';
import { FsRowInlineActionComponent } from './components/body/row/inline-action/inline-action.component';
import { FsRowMenuActionComponent } from './components/body/row/menu-action/menu-action.component';
import { FsRowComponent } from './components/body/row/row.component';
import { CustomizeColsDialogComponent } from './components/customize-cols/customize-cols.component';
import { FsFooterCellComponent } from './components/footer/footer-row/footer-cell/footer-cell.component';
import { FsFooterRowComponent } from './components/footer/footer-row/footer-row.component';
import { FsFooterComponent } from './components/footer/footer.component';
import { FsHeadCellComponent } from './components/head/head-cell/head-cell.component';
import { FsHeadComponent } from './components/head/head.component';
import { FsListComponent } from './components/list/list.component';
import { FsListLoaderComponent } from './components/loader/loader.component';
import { FsPaginationComponent } from './components/pagination/pagination.component';
import { FsStatusComponent } from './components/status/status.component';
import { FsListHeadingDirective } from './directives';
import { FsListCellDirective } from './directives/cell/cell.directive';
import { FsListColumnDirective } from './directives/column/column.directive';
import { FsListContentInitDirective } from './directives/content-init/content-init.directive';
import { FsListContentDirective } from './directives/content/content.directive';
import { FsListDraggableListDirective } from './directives/draggable-list/draggable-list.directive';
import { FsListDraggableRowDirective } from './directives/draggable-row/draggable-row.directive';
import { FsListEmptyStateDirective } from './directives/empty-state/empty-state.directive';
import { FsListFooterDirective } from './directives/footer/footer.directive';
import { FsListGroupExpandTriggerDirective } from './directives/group-expand-trigger/group-expand-trigger.directive';
import { FsListGroupFooterDirective } from './directives/group-footer/group-footer.directive';
import { FsListGroupHeaderDirective } from './directives/group-header/group-header.directive';
import { FsListHeaderDirective } from './directives/header/header.directive';
import { FS_LIST_CONFIG } from './fs-list.providers';
import { FsListConfig } from './interfaces';
import { ActionLabelPipe } from './pipes';


@NgModule({
  imports: [
    FsListComponent,
    FsRowComponent,
    FsRowActionsComponent,
    FsRowInlineActionComponent,
    FsRowMenuActionComponent,
    FsCellComponent,
    FsFooterRowComponent,
    FsFooterCellComponent,
    FsStatusComponent,
    FsListLoaderComponent,
    FsHeadComponent,
    FsHeadCellComponent,
    FsBodyComponent,
    FsFooterComponent,
    FsPaginationComponent,
    FsListColumnDirective,
    FsListCellDirective,
    FsListHeaderDirective,
    FsListFooterDirective,
    FsListGroupHeaderDirective,
    FsListGroupFooterDirective,
    FsListGroupExpandTriggerDirective,
    FsListDraggableListDirective,
    FsListDraggableRowDirective,
    FsListEmptyStateDirective,
    FsListContentDirective,
    FsListContentInitDirective,
    FsListHeadingDirective,
    CustomizeColsDialogComponent,
    ActionLabelPipe,
  ],
  exports: [
    FsListComponent,
    FsRowComponent,
    FsCellComponent,
    FsListLoaderComponent,
    FsListColumnDirective,
    FsListCellDirective,
    FsListHeaderDirective,
    FsListFooterDirective,
    FsListGroupHeaderDirective,
    FsListGroupFooterDirective,
    FsListGroupExpandTriggerDirective,
    FsListEmptyStateDirective,
    FsListContentDirective,
    FsListHeadingDirective,
    FsListDraggableListDirective,
  ],
})
export class FsListModule {
  public static forRoot(config: FsListConfig = {}): ModuleWithProviders<FsListModule> {
    return {
      ngModule: FsListModule,
      providers: [
        { provide: FS_LIST_CONFIG, useValue: config },
      ],
    };
  }
}
