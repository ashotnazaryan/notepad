import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action
} from '@ngrx/store';
import * as fromRoot from '@shared/store/reducers';
import * as fromAuth from './auth.reducer';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromAuth.authFeatureKey]: fromAuth.State;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}

export function reducers(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return combineReducers({
    [fromAuth.authFeatureKey]: fromAuth.reducer
  })(state, action);
}

export const selectAuthState = createFeatureSelector<State, AuthState>(
  authFeatureKey
);

export const selectLoginState = createSelector(selectAuthState, (state) => {
  return state && state[fromAuth.authFeatureKey];
});

export const selectUser = createSelector(
  selectLoginState,
  fromAuth.selectUserFn
);

export const selectLoggedIn = createSelector(
  selectLoginState,
  fromAuth.selectLoggedInFn
);

export const selectLoggedInError = createSelector(
  selectLoginState,
  fromAuth.selectLoggedInErrorFn
);
