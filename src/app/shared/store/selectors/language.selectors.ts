import { createSelector } from '@ngrx/store';

import { selectLanguageState } from '../reducers';
import { State } from '../reducers/language.reducer';

const selectLanguageFn = (state: State): State['language'] => state?.language;

export const selectLanguage = createSelector(
  selectLanguageState,
  selectLanguageFn
);
