import { createAction, props } from '@ngrx/store';

import { Note } from '@modules/tools/pages/notes/models/note';

export const SetNotes = createAction(
  '[Notes] Set notes',
  props<{ notes: Array<Note> }>()
);

export const SetNotesCount = createAction(
  '[Notes] Set notes count',
  props<{ count: number }>()
);