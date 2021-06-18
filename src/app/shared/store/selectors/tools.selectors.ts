import { createSelector } from '@ngrx/store';

import { State } from '../reducers/tools.reducer';
import { selectToolsState } from '../reducers';

const selectChosenGroceryListFn = (state: State): State['chosenGroceryList'] =>
  state?.chosenGroceryList;

const selectChosenGroceriesCountFn = (
  state: State
): State['chosenGroceriesCount'] => state?.chosenGroceriesCount;

const selectSelectedGroceryListFn = (
  state: State
): State['selectedGroceryList'] => state?.selectedGroceryList;

const selectNotesFn = (state: State): State['notes'] => state?.notes;
const selectNotesCountFn = (state: State): State['notesCount'] => state?.notesCount;

export const selectChosenGroceryList = createSelector(
  selectToolsState,
  selectChosenGroceryListFn
);

export const selectSelectedGroceryList = createSelector(
  selectToolsState,
  selectSelectedGroceryListFn
);

export const selectChosenGroceriesCount = createSelector(
  selectToolsState,
  selectChosenGroceriesCountFn
);

export const selectNotes = createSelector(selectToolsState, selectNotesFn);

export const selectNotesCount = createSelector(
  selectToolsState,
  selectNotesCountFn
);