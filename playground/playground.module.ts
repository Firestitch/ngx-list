import './../tools/assets/playground.scss';

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

import { FsListModule } from '../src';
import { AppMaterialModule } from './app/material.module';

import { AppComponent } from './app/app.component';

import {  ExamplesComponent,
          KitchenSinkComponent,
          ActionsComponent,
          RowActionsComponent,
          FiltersComponent,
          SortableComponent,
          FiltersExtendedComponent,
          InfinityScrollComponent,
          NoResultsComponent
         } from './app/components';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsListModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FlexLayoutModule,
    FsExampleModule,
    FsApiModule,
    FsBadgeModule,
    FsDateModule,
    RouterModule.forRoot([
      { path: '', component: ExamplesComponent },
      { path: 'noresults', component: NoResultsComponent },
    ])
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    KitchenSinkComponent,
    ActionsComponent,
    RowActionsComponent,
    FiltersComponent,
    FiltersExtendedComponent,
    SortableComponent,
    InfinityScrollComponent,
    NoResultsComponent
  ],
  providers: [
  ],

})
export class PlaygroundModule {
}
