import { createReducer, on } from '@ngrx/store';

import { AuthActions } from '../actions';
import User, { GoogleUserDTO } from '@core/models/user';

export const authFeatureKey = 'auth';

export interface State {
  user: User<GoogleUserDTO>; // TODO make User generic
  errorMessage?: string;
}

const initialState: State = {
  user: {
    name: 'Anonymous' // TODO translate
  }
};

export const reducer = createReducer(
  initialState,

  on(AuthActions.LoginSuccess, (state, user) => ({
    ...state,
    user
  })),

  on(AuthActions.LoginFail, (state, { message }) => ({
    ...state,
    errorMessage: message
  }))
);

export const selectUserFn = (state: State): State['user'] => state?.user;
export const selectLoggedInFn = (state: State): boolean => !!state?.user;
export const selectLoggedInErrorFn = (state: State): State['errorMessage'] =>
  state?.errorMessage;
