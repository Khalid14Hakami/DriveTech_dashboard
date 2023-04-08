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
    //const currentUser = this.authService.currentUserValue;

    // if (currentUser && currentUser.data.token) {
    //   if (
    //     request.url === environment.apiUrl + 'me/update-profile-pic' ||
    //     request.url === environment.apiUrl + 'signup'
    //   ) {
    //     request = request.clone({
    //       setHeaders: {
    //         Authorization: `Bearer ${currentUser.data.token}`,
    //         Accept: 'application/json',
    //       },
    //     });
    //   } else {
    //     request = request.clone({
    //       setHeaders: {
    //         Authorization: `Bearer ${currentUser.data.token}`,
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //       },
    //     });
    //   }
    // } else {
    //   request = request.clone({
    //     setHeaders: {
    //       accept: 'application/json',
    //       'Content-Type': 'application/json,multipart/form-data',
    //     },
    //   });
    // }

    return next.handle(request).pipe(
      /* to retry and timeout
     retry(2),
     timeout(100),  */

      tap((event: HttpEvent<any>) => {
        if (
          event instanceof HttpResponse &&
          (event.status === 200 || event.status === 201)
        ) {
        }
      }),
      catchError((errResponse: HttpErrorResponse) => {
        if (errResponse.status === 401) {
          if (errResponse?.error.message === 'Unauthenticated.') {
            localStorage.removeItem('cu_');
            localStorage.removeItem('rc_');
            localStorage.removeItem('_pp');
            localStorage.removeItem('_pnf');
            // this.authService.currentUserSubject.next(null);
          }
        } else if (
          errResponse?.error?.error === 'USER_BLOCKED' &&
          errResponse.status === 403
        ) {
        }

        // if (errResponse.status === 403) {
        //   //data: "Balance Security Check Failed"
        //   //security_flag: false;
        //   if (!errResponse?.error?.security_flag) {

        //   }
        // }
        const err = errResponse?.error?.error;

        return throwError(errResponse);
      })
    );
  }
}
