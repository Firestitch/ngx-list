import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FsExampleModule } from '@firestitch/example';
import { FsApiModule } from '@firestitch/api';

import { FsListModule } from '../src';
import { AppMaterialModule } from './app/material.module';
import { KitchenSinkComponent } from './app/components/kitchensink/kitchensink.component';
import { ActionsComponent } from './app/components/actions/actions.component';
import { RowActionsComponent } from './app/components/row-actions/row-actions.component';
import { FiltersComponent } from './app/components/filters/filters.component';
import { SortableComponent } from './app/components/sortable/sortable.component';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsListModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FlexLayoutModule,
    FsExampleModule,
    FsApiModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent}
    ])
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    KitchenSinkComponent,
    ActionsComponent,
    RowActionsComponent,
    FiltersComponent,
    SortableComponent,
  ],
  providers: [
  ],

})
export class PlaygroundModule {
}
