import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FsExampleModule } from '@firestitch/example';
import { FsApiModule } from '@firestitch/api';
import { FsBadgeModule } from '@firestitch/badge';
import { FsDateModule } from '@firestitch/date';
import { FsScrollModule } from '@firestitch/scroll';
import { FsMessageModule } from '@firestitch/message';
import { FsSelectionModule } from '@firestitch/selection';
import { ToastrModule } from 'ngx-toastr';

import { FsListModule } from '@firestitch/list';

import { AppMaterialModule } from './material.module';

import { AppComponent } from './app.component';

import {
  ExamplesComponent,
  KitchenSinkComponent,
  AlwaysReorderComponent,
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
} from './components';

import { RestoreComponent } from './components/restore/restore.component';
import { FsPromptModule } from '@firestitch/prompt';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsListModule.forRoot(),
    FsScrollModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FlexLayoutModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    FsSelectionModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    FsPromptModule.forRoot(),
    FsApiModule,
    FsBadgeModule,
    FsDateModule,
    RouterModule.forRoot([
      { path: '', component: ExamplesComponent },
      { path: 'noresults', component: NoResultsComponent },
      { path: 'paging', component: PagingComponent },
    ])
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    KitchenSinkComponent,
    AlwaysReorderComponent,
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
    AgoComponent
  ],
  providers: [
  ],

})
export class PlaygroundModule {
}
