import { createAction, props } from '@ngrx/store';

import { LoginProvider } from '@core/models';
import User from '@core/models/user';

export const Login = createAction(
  '[Auth] Login',
  props<{ provider: LoginProvider }>()
);

export const LoginSuccess = createAction(
  '[Auth] Login success',
  props<User>()
);

export const LoginFail = createAction(
  '[Auth] Login fail',
  props<{ message: string }>()
);

export const Logout = createAction('[Login] Logout');
export const LogoutSuccess = createAction('[Login] Logout success');

export const LogoutFail = createAction(
  '[Auth] Logout fail',
  props<{ message: string }>()
);
