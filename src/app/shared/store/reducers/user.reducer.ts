import { createReducer, on } from '@ngrx/store';

import { GoogleUser } from '@core/models';
import { UserActions } from '@shared/store/actions';

export const userFeatureKey = 'user';

export interface State {
  user: GoogleUser; // TODO make User generic
}

const initialState: State = {
  user: {
    name: 'Anonymous' // TODO translate
  }
};

export const reducer = createReducer(
  initialState,
  on(UserActions.LoginSuccess, (state, user) => ({
    ...state,
    user
  }))
);

export const selectUserFn = (state: State): State['user'] => state?.user;
