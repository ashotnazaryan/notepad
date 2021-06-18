import { createSelector } from '@ngrx/store';

import { State, loginFeatureKey } from '../reducers/login.reducer';
import { selectAuthState } from '../reducers';

const selectUserFn = (state: State): State['user'] => state?.user;
const selectLoggedInFn = (state: State): boolean => !!state?.user;
const selectLoggedInErrorFn = (state: State): State['errorMessage'] =>
  state?.errorMessage;

export const selectLoginState = createSelector(selectAuthState, (state) => {
  return state && state[loginFeatureKey];
});

export const selectUser = createSelector(selectLoginState, selectUserFn);

export const selectLoggedIn = createSelector(
  selectLoginState,
  selectLoggedInFn
);

export const selectLoggedInError = createSelector(
  selectLoginState,
  selectLoggedInErrorFn
);
