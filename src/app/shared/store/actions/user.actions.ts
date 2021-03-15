import { createAction, props } from '@ngrx/store';

import { GoogleUser, LoginProvider } from '@core/models';

export const Login = createAction(
  '[User] Login',
  props<{ provider: LoginProvider }>()
);

export const LoginSuccess = createAction(
  '[User] Login success',
  props<GoogleUser>() // TODO make User generic
);

export const LoginFail = createAction(
  '[User] Login fail',
  props<{ message: string }>()
);
