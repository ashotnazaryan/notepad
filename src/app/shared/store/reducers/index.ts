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
import * as fromUser from './user.reducer';

export interface State {
  [fromModulePage.modulePageFeatureKey]: fromModulePage.State;
  [fromLanguage.languageFeatureKey]: fromLanguage.State;
  [fromUser.userFeatureKey]: fromUser.State;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('Root reducers token', {
  factory: () => ({
    [fromModulePage.modulePageFeatureKey]: fromModulePage.reducer,
    [fromLanguage.languageFeatureKey]: fromLanguage.reducer,
    [fromUser.userFeatureKey]: fromUser.reducer
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

export const selectUserState = createFeatureSelector<
  State,
  fromUser.State
>(fromUser.userFeatureKey);

export const selectModulePage = createSelector(
  selectModulePageState,
  fromModulePage.selectModulePageFn
);

export const selectLanguage = createSelector(
  selectLanguageState,
  fromLanguage.selectLanguageFn
);

export const selectUser = createSelector(
  selectUserState,
  fromUser.selectUserFn
);
