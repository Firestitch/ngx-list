import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FsApiModule } from '@firestitch/api';
import { FsExampleModule } from '@firestitch/example';

import { FsListModule } from '../src';

import { AppComponent } from './app/app.component';
import { AppMaterialModule } from './app/material.module';
import { ListComponent } from './app/compoents/list/list.component';
import { WelcomeComponent } from './app/compoents/welcome/welcome.component';

import 'rxjs/add/operator/map';

import './../tools/assets/playground.scss';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    ListComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    FsListModule,
    BrowserAnimationsModule,
    FsApiModule,
    FormsModule,
    FsExampleModule,
    RouterModule.forRoot([
      { path: '', component: ListComponent},
      { path: 'welcome', component: WelcomeComponent },
    ])
  ],
  entryComponents: [
  ]
})
export class PlaygroundModule {}


