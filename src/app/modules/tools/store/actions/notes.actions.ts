import { createAction, props } from '@ngrx/store';

export const SetNotes = createAction(
  '[Notes] Set notes',
  props<{ notes: Array<string> }>()
);