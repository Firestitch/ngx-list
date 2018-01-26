import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FsApiModule } from '@firestitch/api';

import { FsListModule } from '../src';

import { AppComponent } from './app/app.component';
import { ListComponent } from './app/compoents/list/list.component';
import { WelcomeComponent } from './app/compoents/welcome/welcome.component';

import 'rxjs/add/operator/map';

import './vendor.scss';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    ListComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    FsListModule,
    BrowserAnimationsModule,
    FsApiModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: ListComponent },
      { path: 'welcome', component: WelcomeComponent },
    ])
  ],
  entryComponents: [
  ]
})
export class PlaygroundModule {}


