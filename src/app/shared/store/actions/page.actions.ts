import { createAction, props } from '@ngrx/store';

import { ModulePage } from '@shared/models/route';

export const SetPage = createAction(
  '[Page] Set current page',
  props<ModulePage>()
);