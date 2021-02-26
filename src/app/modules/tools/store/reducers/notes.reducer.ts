import { createReducer, on } from '@ngrx/store';

import { NotesPageActions } from '../actions';

export const notesFeatureKey = 'notes';

export interface State {
  notes: Array<string>;
}

const initialState: State = {
  notes: []
};

export const reducer = createReducer(
  initialState,

  on(NotesPageActions.SetNotes, (state, { notes }) => ({
    ...state,
    notes
  }))
);

export const selectNotesFn = (state: State): Array<string> => state.notes;