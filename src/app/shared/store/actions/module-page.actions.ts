import { createAction, props } from '@ngrx/store';

import { ModulePage } from '@core/models';

export const SetModulePage = createAction(
  '[ModulePage] Set current module and page',
  props<ModulePage>()
);
