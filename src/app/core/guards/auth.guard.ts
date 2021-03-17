import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { ROUTES } from '@core/constants';
import { AuthenticationService } from '@modules/authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const loggedIn = this.authentication.loggedIn;

    if (!loggedIn) {
      this.router.navigate([`${ROUTES.authentication.route}`]);
    }

    return loggedIn;
  }

  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const loggedIn = this.authentication.loggedIn;

    if (!loggedIn) {
      this.router.navigate([`${ROUTES.authentication.route}`]);
    }

    return loggedIn;
  }
}
