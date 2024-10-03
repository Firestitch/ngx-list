import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { FsApiModule } from '@firestitch/api';
import { FsBadgeModule } from '@firestitch/badge';
import { FsDateModule } from '@firestitch/date';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsExampleModule } from '@firestitch/example';
import { FsFileModule } from '@firestitch/file';
import { FsFilterModule } from '@firestitch/filter';
import { FsLabelModule } from '@firestitch/label';
import { FsListModule } from '@firestitch/list';
import { FsMessageModule } from '@firestitch/message';
import { FsPromptModule } from '@firestitch/prompt';
import { FsScrollModule } from '@firestitch/scroll';
import { FsSelectionModule } from '@firestitch/selection';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import {
  ActionsComponent,
  AgoComponent,
  CustomReorderComponent,
  EmptyStateComponent,
  ExamplesComponent,
  FiltersComponent,
  FiltersExtendedComponent,
  GlobalStrategyComponent,
  GroupsComponent,
  KitchenSinkComponent,
  ManualReorderComponent,
  NoResultsComponent,
  PagingComponent,
  RemoveConfirmComponent,
  RemoveSimpleComponent,
  RowActionsComponent,
  SelectionComponent,
  SelectionReorderComponent,
  SortableComponent,
  StyleComponent,
  ToggleReorderComponent,
} from './components';
import { ConfigureComponent } from './components/configure';
import { StrategyBaseComponent } from './components/examples/strategy-base/strategy-base.component';
import { LoadMoreComponent } from './components/load-more';
import { RestoreComponent } from './components/restore/restore.component';
import { AppMaterialModule } from './material.module';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsListModule.forRoot({
      style: 'card',
    }),
    FsScrollModule.forRoot(),
    FsFilterModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsLabelModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    FsSelectionModule,
    ToastrModule.forRoot({ preventDuplicates: true }),
    FsPromptModule.forRoot(),
    FsApiModule,
    FsBadgeModule,
    FsDateModule.forRoot(),
    FsDatePickerModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ExamplesComponent },
      { path: 'noresults', component: NoResultsComponent },
      { path: 'paging', component: PagingComponent },
    ], {}),
    FsFileModule.forRoot({}),
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    KitchenSinkComponent,
    ToggleReorderComponent,
    ManualReorderComponent,
    CustomReorderComponent,
    RemoveSimpleComponent,
    RemoveConfirmComponent,
    ActionsComponent,
    RowActionsComponent,
    FiltersComponent,
    StyleComponent,
    FiltersExtendedComponent,
    SortableComponent,
    RestoreComponent,
    NoResultsComponent,
    PagingComponent,
    SelectionComponent,
    AgoComponent,
    GlobalStrategyComponent,
    StrategyBaseComponent,
    ConfigureComponent,
    GroupsComponent,
    EmptyStateComponent,
    LoadMoreComponent,
    SelectionReorderComponent,
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { floatLabel: 'always' } },
  ],
})
export class PlaygroundModule {
}
