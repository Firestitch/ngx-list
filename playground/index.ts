import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { FsListModule, FsList }  from '@firestitch/list';
import { FsApiModule, FsApi } from '@firestitch/api';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FsArray } from '@firestitch/common';
import { WelcomeComponent } from './welcome.component.js';
import { ListComponent } from './list.component.js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  styleUrls: [ 'styles.css' ],
  encapsulation: ViewEncapsulation.None
})
class AppComponent {
    constructor(fsArray: FsArray, fsApi: FsApi) {
    }
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent, WelcomeComponent, ListComponent ],
  imports: [ BrowserModule,
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
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);



