import { createReducer, on } from '@ngrx/store';

import { APP_CONFIGS } from '@core/config';
import { Language } from '@shared/models';
import { LanguageActions } from '@shared/store/actions';

export const languageFeatureKey = 'language';

export interface State {
  language: Language;
}

const initialState: State = {
  language: APP_CONFIGS.DEFAULT_LANGUAGE
};

export const reducer = createReducer(
  initialState,
  on(LanguageActions.SetLanguage, (state, language) => ({
    ...state,
    language,
  }))
);

export const selectLanguage = (state: State) => state.language;