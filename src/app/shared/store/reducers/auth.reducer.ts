import { createReducer, on } from '@ngrx/store';

import User from '@shared/models/user';
import { AuthActions } from '../actions';

export const authFeatureKey = 'auth';

export interface State {
  user: User;
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
