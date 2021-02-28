import { createReducer, on } from '@ngrx/store';

import { APP_CONFIGS } from '@core/config';
import { Language } from '@shared/models';
import { LANGUAGES } from '@shared/constants';
import { LanguageActions } from '@shared/store/actions';

export const languageFeatureKey = 'language';

export interface State {
  language: Language;
}

const initialState: State = {
  language: LANGUAGES.filter((language) => language.key === APP_CONFIGS.DEFAULT_LANGUAGE_KEY)[0],
};

export const reducer = createReducer(
  initialState,
  on(LanguageActions.SetLanguage, (state, language) => ({
    ...state,
    language,
  }))
);

export const selectLanguageFn = (state: State): State['language'] => state.language;