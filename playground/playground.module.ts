import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FsListModule } from '../src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppMaterialModule } from './app/material.module';
import { KitchenSinkComponent } from './app/components/kitchensink/kitchensink.component';
import { ActionsComponent } from './app/components/actions/actions.component';
import { RowActionsComponent } from './app/components/row-actions/row-actions.component';
import { FiltersComponent } from './app/components/filters/filters.component';
import { FsExamplesComponent } from '../tools/components/examples/examples.component';
import { FsExampleModule } from '@firestitch/example';
import { FsApiModule } from '@firestitch/api';
import { RouterModule } from '@angular/router';

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
    FsExamplesComponent,
    FiltersComponent
  ],
  providers: [
  ],

})
export class PlaygroundModule {
}
