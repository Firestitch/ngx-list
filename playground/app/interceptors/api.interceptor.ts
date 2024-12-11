

import { FsApiConfig, makeInterceptorFactory } from '@firestitch/api';

import { Observable } from 'rxjs';

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';


export class ApiInterceptor implements HttpInterceptor {

  public readonly API_ERROR_RESOURCE_NOT_FOUND = 404;
  public readonly API_ERROR_INVALID_AUTHORIZATION = 490;

  private _environment: any;

  constructor(
    public config: FsApiConfig,
    public data,
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const domain = window.location.hostname === 'localhost' ? 
      'https://specify.local.firestitch.com/api/' : 
      'https://specify.firestitch.dev/api/';
    const url = domain.concat(req.url);

    return next.handle(req.clone({ url }));
  }
}

export const ApiInterceptorFactory = makeInterceptorFactory(ApiInterceptor);
