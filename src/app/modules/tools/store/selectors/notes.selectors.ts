import { createSelector } from '@ngrx/store';

import { State, notesFeatureKey } from '../reducers/notes.reducer';
import { selectToolsState } from '../reducers';

const selectNotesFn = (state: State): State['notes'] => state?.notes;
const selectNotesCountFn = (state: State): State['count'] => state?.count;

export const selectNotesState = createSelector(selectToolsState, (state) => {
  return state && state[notesFeatureKey];
});

export const selectNotes = createSelector(selectNotesState, selectNotesFn);

export const selectNotesCount = createSelector(
  selectNotesState,
  selectNotesCountFn
);
