import { createAction, props } from '@ngrx/store';

import { Grocery } from '@shared/models';
import { Note } from '@modules/tools/pages/notes/models/note';

export const SetChosenGroceryList = createAction(
  '[Groceries] Set chosen grocery list',
  props<{ chosenGroceryList: Array<Grocery> }>()
);

export const SetSelectedGroceryList = createAction(
  '[Groceries] Set selected grocery list',
  props<{ selectedGroceryList: Array<Grocery> }>()
);

export const SetChosenGroceriesCount = createAction(
  '[Groceries] Set chosen grocery count',
  props<{ chosenGroceriesCount: number }>()
);

export const SetNotes = createAction(
  '[Notes] Set notes',
  props<{ notes: Array<Note> }>()
);

export const SetNotesCount = createAction(
  '[Notes] Set notes count',
  props<{ notesCount: number }>()
);