import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FsExampleModule } from '@firestitch/example';
import { FsApiModule } from '@firestitch/api';
import { FsBadgeModule } from '@firestitch/badge';
import { FsDateModule } from '@firestitch/date';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { FsScrollModule } from '@firestitch/scroll';
import { FsMessageModule } from '@firestitch/message';
import { FsSelectionModule } from '@firestitch/selection';
import { FsLabelModule } from '@firestitch/label';
import { ToastrModule } from 'ngx-toastr';

import { FsListModule } from '@firestitch/list';
import { FsPromptModule } from '@firestitch/prompt';

import { AppMaterialModule } from './material.module';

import { AppComponent } from './app.component';

import {
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
  SortableComponent,
  FiltersExtendedComponent,
  InfinityScrollComponent,
  PagingComponent,
  NoResultsComponent,
  SelectionComponent,
  AgoComponent,
  GlobalStrategyComponent,
  GroupsComponent,
  EmptyStateComponent,
  SelectionReorderComponent,
} from './components';

import { RestoreComponent } from './components/restore/restore.component';
import { StrategyBaseComponent } from './components/examples/strategy-base/strategy-base.component';
import { ConfigureComponent } from './components/configure';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FsFileModule } from '@firestitch/file';
import { LoadMoreComponent } from './components/load-more';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsListModule.forRoot(),
    FsScrollModule.forRoot(),
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
], { relativeLinkResolution: 'legacy' }),
    FsFileModule.forRoot({}),
  ],
  entryComponents: [
    ConfigureComponent
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
    FiltersExtendedComponent,
    SortableComponent,
    InfinityScrollComponent,
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
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'} }
  ],

})
export class PlaygroundModule {
}
