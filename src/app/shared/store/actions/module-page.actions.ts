import { createAction, props } from '@ngrx/store';

import { ModulePage } from '@shared/models';

export const SetModulePage = createAction(
  '[ModulePage] Set current module and page',
  props<ModulePage>()
);