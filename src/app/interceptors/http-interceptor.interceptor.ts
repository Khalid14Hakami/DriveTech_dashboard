/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, retry, tap, timeout } from 'rxjs/operators';
// import { AuthServiceService } from '../service/auth-service.service';

import { CmnServiceService } from '../service/cmn-service/cmn-service.service';

import { environment } from 'src/environments/environment';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {
  constructor(private cmnService: CmnServiceService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (
          event instanceof HttpResponse &&
          (event.status === 200 || event.status === 201)
        ) {
        }
      }),
      catchError((errResponse: HttpErrorResponse) => {
        const err = errResponse?.error?.error;

        return throwError(errResponse);
      })
    );
  }
}
