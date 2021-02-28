import { createReducer, on } from '@ngrx/store';

import { NotesActions } from '../actions';

export const notesFeatureKey = 'notes';

export interface State {
  notes: Array<string>;
  count: number;
}

const initialState: State = {
  notes: [],
  count: 0
};

export const reducer = createReducer(
  initialState,

  on(NotesActions.SetNotes, (state, { notes }) => ({
    ...state,
    notes
  })),

  on(NotesActions.SetNotesCount, (state, { count }) => ({
    ...state,
    count
  }))
);

export const selectNotesFn = (state: State): State['notes'] => state.notes;
export const selectNotesCountFn = (state: State): State['count'] => state.count;