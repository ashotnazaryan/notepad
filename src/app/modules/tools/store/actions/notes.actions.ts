import { createAction, props } from '@ngrx/store';

export const SetNotes = createAction(
  '[Notes] Set notes',
  props<{ notes: Array<string> }>()
);

export const SetNotesCount = createAction(
  '[Notes] Set notes count',
  props<{ count: number }>()
);