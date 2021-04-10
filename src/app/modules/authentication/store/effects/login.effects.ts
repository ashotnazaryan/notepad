import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { ROUTES } from '@core/constants';
import User, { GoogleUserDTO } from '@core/models/user';
import {
  HideLoading,
  ShowLoading
} from '@shared/store/actions/loading.actions';
import { CacheService } from '@shared/services/cache.service';
import { CacheKey } from '@shared/models';
import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { LoginActions } from '../actions';
import * as fromAuth from '../reducers';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.Login),
      map((action) => action.provider),
      tap(() => this.store.dispatch(ShowLoading())),
      exhaustMap((provider) =>
        this.authentication.login(provider).pipe(
          map((user) => {
            const normalizedUser = new User<GoogleUserDTO>(user, provider);

            this.cache.setItem(CacheKey.USER, normalizedUser);

            return LoginActions.LoginSuccess(normalizedUser);
          }),
          catchError(({ message }) => {
            this.store.dispatch(HideLoading());

            return of(LoginActions.LoginFail({ message }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.LoginSuccess),
        tap(() =>
          this.ngZone
            // https://github.com/angular/angular/issues/25837
            .run(() => this.router.navigate([`${ROUTES.admin.route}`]))
            .then()
        ),
        tap(() => this.store.dispatch(HideLoading()))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.Logout),
      tap(() => this.store.dispatch(ShowLoading())),
      exhaustMap(() =>
        this.authentication.logout().pipe(
          map(() => {
            localStorage.removeItem('user');

            return LoginActions.LogoutSuccess();
          }),
          catchError(({ message }) => {
            this.store.dispatch(HideLoading());

            return of(LoginActions.LogoutFail({ message }));
          })
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.LogoutSuccess),
        tap(() =>
          this.ngZone
            // https://github.com/angular/angular/issues/25837
            .run(() => this.router.navigate([`${ROUTES.authentication.route}`]))
            .then()
        ),
        tap(() => this.store.dispatch(HideLoading()))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromAuth.State>,
    private router: Router,
    private authentication: AuthenticationService,
    private cache: CacheService,
    private ngZone: NgZone
  ) {}
}
