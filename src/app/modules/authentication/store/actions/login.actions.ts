import { createAction, props } from '@ngrx/store';

import { GoogleUser, LoginProvider } from '@core/models';

export const Login = createAction(
  '[Login] Login',
  props<{ provider: LoginProvider }>()
);

export const LoginSuccess = createAction(
  '[Login] Login success',
  props<GoogleUser>() // TODO make User generic
);

export const LoginFail = createAction(
  '[Login] Login fail',
  props<{ error: string }>()
);
