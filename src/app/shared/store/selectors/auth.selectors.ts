import { createSelector } from '@ngrx/store';

import { State } from '../reducers/auth.reducer';
import { selectAuthState } from '../reducers';

const selectUserFn = (state: State): State['user'] => state?.user;
const selectLoggedInFn = (state: State): boolean => !!state?.user;
const selectLoggedInErrorFn = (state: State): State['errorMessage'] =>
  state?.errorMessage;

export const selectUser = createSelector(selectAuthState, selectUserFn);

export const selectLoggedIn = createSelector(
  selectAuthState,
  selectLoggedInFn
);

export const selectLoggedInError = createSelector(
  selectAuthState,
  selectLoggedInErrorFn
);
