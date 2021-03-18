import { InjectionToken } from '@angular/core';
import {
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
  Action,
  ActionReducerMap
} from '@ngrx/store';

import { environment } from '@environments/environment';
import * as fromModulePage from './module-page.reducer';
import * as fromLanguage from './language.reducer';
import * as fromLoading from './loading.reducer';
import * as fromAuth from './auth.reducer';

export interface State {
  [fromModulePage.modulePageFeatureKey]: fromModulePage.State;
  [fromLanguage.languageFeatureKey]: fromLanguage.State;
  [fromLoading.loadingFeatureKey]: fromLoading.State;
  [fromAuth.authFeatureKey]: fromAuth.State;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromModulePage.modulePageFeatureKey]: fromModulePage.reducer,
    [fromLanguage.languageFeatureKey]: fromLanguage.reducer,
    [fromLoading.loadingFeatureKey]: fromLoading.reducer,
    [fromAuth.authFeatureKey]: fromAuth.reducer
  })
});

export const logger = (reducer: ActionReducer<State>): ActionReducer<State> => {
  return (state, action) => {
    const result = reducer(state, action);

    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger]
  : [];

export const selectModulePageState = createFeatureSelector<
  State,
  fromModulePage.State
>(fromModulePage.modulePageFeatureKey);

export const selectLanguageState = createFeatureSelector<
  State,
  fromLanguage.State
>(fromLanguage.languageFeatureKey);

export const selectLoadingState = createFeatureSelector<
  State,
  fromLoading.State
>(fromLoading.loadingFeatureKey);

export const selectAuthState = createFeatureSelector<State, fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectModulePage = createSelector(
  selectModulePageState,
  fromModulePage.selectModulePageFn
);

export const selectLanguage = createSelector(
  selectLanguageState,
  fromLanguage.selectLanguageFn
);

export const selectLoading = createSelector(
  selectLoadingState,
  fromLoading.selectLoadingeFn
);

export const selectUser = createSelector(
  selectAuthState,
  fromAuth.selectUserFn
);

export const selectLoggedIn = createSelector(
  selectAuthState,
  fromAuth.selectLoggedInFn
);

export const selectLoggedInError = createSelector(
  selectAuthState,
  fromAuth.selectLoggedInErrorFn
);

// export const selectAuthState = createFeatureSelector<State, AuthState>(
//   authFeatureKey
// );

// export const selectLoginState = createSelector(selectAuthState, (state) => {
//   return state && state[fromAuth.authFeatureKey];
// });

// export const selectUser = createSelector(
//   selectLoginState,
//   fromAuth.selectUserFn
// );

// export const selectLoggedIn = createSelector(
//   selectLoginState,
//   fromAuth.selectLoggedInFn
// );

// export const selectLoggedInError = createSelector(
//   selectLoginState,
//   fromAuth.selectLoggedInErrorFn
// );
