import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action
} from '@ngrx/store';
import * as fromRoot from '@shared/store/reducers';
import * as fromLogin from './login.reducer';

export const authFeatureKey = 'auth';

export interface AuthState {
  [fromLogin.loginFeatureKey]: fromLogin.State;
}

export interface State extends fromRoot.State {
  [authFeatureKey]: AuthState;
}

export function reducers(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return combineReducers({
    [fromLogin.loginFeatureKey]: fromLogin.reducer
  })(state, action);
}

export const selectAuthState = createFeatureSelector<State, AuthState>(
  authFeatureKey
);

export const selectLoginState = createSelector(selectAuthState, (state) => {
  return state && state[fromLogin.loginFeatureKey];
});

export const selectUser = createSelector(
  selectLoginState,
  fromLogin.selectUserFn
);
