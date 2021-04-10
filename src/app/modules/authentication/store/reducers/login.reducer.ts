import { createReducer, on } from '@ngrx/store';

import User, { GoogleUserDTO } from '@core/models/user';
import { LoginActions } from '../actions';

export const loginFeatureKey = 'login';

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

  on(LoginActions.LoginSuccess, (state, user) => ({
    ...state,
    user
  })),

  on(LoginActions.LoginFail, (state, { message }) => ({
    ...state,
    errorMessage: message
  }))
);
