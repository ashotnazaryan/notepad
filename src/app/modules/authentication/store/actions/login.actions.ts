import { createAction, props } from '@ngrx/store';

import { LoginProvider } from '@core/models';
import User, { GoogleUserDTO } from '@core/models/user';

export const Login = createAction(
  '[Login] Login',
  props<{ provider: LoginProvider }>()
);

export const LoginSuccess = createAction(
  '[Login] Login success',
  props<User<GoogleUserDTO>>() // TODO make User generic
);

export const LoginFail = createAction(
  '[Login] Login fail',
  props<{ error: string }>()
);
