import { enableProdMode, Injector, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FS_API_REQUEST_INTERCEPTOR, FsApiModule } from '@firestitch/api';
import { ApiInterceptorFactory } from './app/interceptors';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FsListModule } from '../src/public_api';
import { FsFilterModule, ButtonStyle } from '@firestitch/filter';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsLabelModule } from '@firestitch/label';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsSelectionModule } from '@firestitch/selection';
import { FsPromptModule } from '@firestitch/prompt';
import { FsBadgeModule } from '@firestitch/badge';
import { FsDateModule } from '@firestitch/date';
import { FsDatePickerModule } from '@firestitch/datepicker';
import { provideRouter } from '@angular/router';
import { ExamplesComponent, NoResultsComponent, PagingComponent } from './app/components';
import { FsFileModule } from '@firestitch/file';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FsListModule.forRoot({
            paging: {
                limit: 5,
            },
        }), FsFilterModule.forRoot({
            queryParam: true,
            chips: true,
            button: {
                label: '',
            },
            buttonStyle: ButtonStyle.Flat,
        }), FormsModule, FsLabelModule, FsExampleModule.forRoot(), FsMessageModule.forRoot(), FsSelectionModule, FsPromptModule.forRoot(), FsApiModule, FsBadgeModule, FsDateModule.forRoot(), FsDatePickerModule.forRoot(), FsFileModule.forRoot({})),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { floatLabel: 'auto', appearance: 'outline' },
        },
        {
            provide: FS_API_REQUEST_INTERCEPTOR,
            useFactory: ApiInterceptorFactory,
            deps: [Injector],
            multi: true,
        },
        provideAnimations(),
        provideRouter([
            { path: '', component: ExamplesComponent },
            { path: 'noresults', component: NoResultsComponent },
            { path: 'paging', component: PagingComponent },
        ]),
    ]
})
  .catch(err => console.error(err));

