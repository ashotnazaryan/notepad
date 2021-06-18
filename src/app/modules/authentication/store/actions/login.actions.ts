import { createAction, props } from '@ngrx/store';

import { LoginProvider } from '@core/models';
import User from '@core/models/user';

export const Login = createAction(
  '[Login] Login',
  props<{ provider: LoginProvider }>()
);

export const LoginSuccess = createAction(
  '[Login] Login success',
  props<User>()
);

export const LoginFail = createAction(
  '[Login] Login fail',
  props<{ message: string }>()
);

export const Logout = createAction('[Login] Logout');
export const LogoutSuccess = createAction('[Login] Logout success');

export const LogoutFail = createAction(
  '[Login] Logout fail',
  props<{ message: string }>()
);
