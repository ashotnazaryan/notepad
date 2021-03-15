import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { UserActions } from '../actions';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.Login),
      map((action) => action.provider),
      exhaustMap((provider) =>
        this.authenticationService.login(provider).pipe(
          map((user) => UserActions.LoginSuccess(user)),
          catchError(() =>
            of(UserActions.LoginFail({ message: 'Login failed' }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.LoginSuccess),
        tap(() => this.router.navigate(['/tools/notes']))
      ),
    { dispatch: false }
  );

  loginFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.LoginFail),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}
}
