import './../tools/assets/playground.scss';
import './styles.scss';

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
import { ToastrModule } from 'ngx-toastr';

import { FsListModule } from '../src';
import { AppMaterialModule } from './app/material.module';

import { AppComponent } from './app/app.component';

import {  ExamplesComponent,
          KitchenSinkComponent,
          ReorderComponent,
          ActionsComponent,
          RowActionsComponent,
          FiltersComponent,
          SortableComponent,
          FiltersExtendedComponent,
          InfinityScrollComponent,
          PagingComponent,
          NoResultsComponent
         } from './app/components';
import { RestoreComponent } from './app/components/restore/restore.component';


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
    ToastrModule.forRoot({ preventDuplicates: true }),
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
    ReorderComponent,
    ActionsComponent,
    RowActionsComponent,
    FiltersComponent,
    FiltersExtendedComponent,
    SortableComponent,
    InfinityScrollComponent,
    RestoreComponent,
    NoResultsComponent,
    PagingComponent
  ],
  providers: [
  ],

})
export class PlaygroundModule {
}
