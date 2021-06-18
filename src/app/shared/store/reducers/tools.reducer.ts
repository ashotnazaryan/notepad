import { createReducer, on } from '@ngrx/store';
import { unionBy } from 'lodash';

import { Grocery } from '@shared/models';
import { Note } from '@shared/models';
import { ToolsActions } from '../actions';

export const toolsFeatureKey = 'tools';

export interface State {
  chosenGroceryList: Array<Grocery>;
  chosenGroceriesCount: number;
  selectedGroceryList: Array<Grocery>;
  notes: Array<Note>;
  notesCount: number;
}

const initialState: State = {
  chosenGroceryList: [],
  chosenGroceriesCount: 0,
  selectedGroceryList: [],
  notes: [],
  notesCount: 0
};

export const reducer = createReducer(
  initialState,

  on(ToolsActions.SetChosenGroceryList, (state, { chosenGroceryList }) => ({
    ...state,
    chosenGroceryList: unionBy(
      chosenGroceryList,
      state.chosenGroceryList,
      'key'
    )
  })),

  on(
    ToolsActions.SetChosenGroceriesCount,
    (state, { chosenGroceriesCount }) => ({
      ...state,
      chosenGroceriesCount
    })
  ),

  on(
    ToolsActions.SetSelectedGroceryList,
    (state, { selectedGroceryList }) => ({
      ...state,
      selectedGroceryList
    })
  ),

  on(ToolsActions.SetNotes, (state, { notes }) => ({
    ...state,
    notes
  })),

  on(ToolsActions.SetNotesCount, (state, { notesCount }) => ({
    ...state,
    notesCount
  }))
);
