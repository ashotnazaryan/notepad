import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { ROUTES } from '@core/constants';
import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { LoginActions } from '../actions';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.Login),
      map((action) => action.provider),
      exhaustMap((provider) =>
        this.authenticationService.login(provider).pipe(
          map((user) => {
            const userStr = JSON.stringify(user);

            localStorage.setItem('user', userStr);
            console.log('User: ', user);

            return LoginActions.LoginSuccess(user);
          }),
          catchError(() =>
            of(LoginActions.LoginFail({ error: 'Login failed' }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LoginActions.LoginSuccess),
        tap(() =>
          this.router.navigate([
            `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.notes.route}`
          ])
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
}
