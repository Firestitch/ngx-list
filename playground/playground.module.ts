import './vendor.scss';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/operator/map';
import { FsListModule } from '../src';
import { FsApiModule } from '@firestitch/api';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app/app.component';
import { ListComponent } from './app/compoents/list/list.component';
import { WelcomeComponent } from './app/compoents/welcome/welcome.component';

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
    RouterModule.forRoot([
      { path: '', redirectTo: 'list', pathMatch: 'full'},
      { path: 'list', component: ListComponent },
      { path: 'welcome', component: WelcomeComponent },
    ])
  ]
})
export class PlaygroundModule {}


