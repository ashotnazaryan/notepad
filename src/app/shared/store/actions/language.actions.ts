import { createAction, props } from '@ngrx/store';

import { Language } from '@shared/models';

export const SetLanguage = createAction(
  '[Language] Set current language',
  props<Language>()
);