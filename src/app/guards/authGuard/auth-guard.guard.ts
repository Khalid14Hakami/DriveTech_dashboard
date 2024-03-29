/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from 'src/app/auth/login/login.component';
import { AuthServiceService } from 'src/app/service/auth-service/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let currentUser = this.authService.currentUserValue;

    if (currentUser) {
      this.router.navigateByUrl('admin');
      return false;
    }

    return true;
  }
}
