import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action
} from '@ngrx/store';
import * as fromRoot from '@shared/store/reducers';
import * as fromGrocery from './grocery.reducer';
import * as fromNotes from './notes.reducer';

export const toolsFeatureKey = 'tools';

export interface ToolsState {
  [fromGrocery.groceryFeatureKey]: fromGrocery.State;
  [fromNotes.notesFeatureKey]: fromNotes.State;
}

export interface State extends fromRoot.State {
  [toolsFeatureKey]: ToolsState;
}

export function reducers(
  state: ToolsState | undefined,
  action: Action
): ToolsState {
  return combineReducers({
    [fromGrocery.groceryFeatureKey]: fromGrocery.reducer,
    [fromNotes.notesFeatureKey]: fromNotes.reducer
  })(state, action);
}

export const selectToolsState = createFeatureSelector<State, ToolsState>(
  toolsFeatureKey
);

export const selectGroceryState = createSelector(selectToolsState, (state) => {
  return state && state[fromGrocery.groceryFeatureKey];
});

export const selectNotesState = createSelector(selectToolsState, (state) => {
  return state && state[fromNotes.notesFeatureKey];
});

export const selectChosenGroceryList = createSelector(
  selectGroceryState,
  fromGrocery.selectChosenGroceryListFn
);

export const selectSelectedGroceryList = createSelector(
  selectGroceryState,
  fromGrocery.selectSelectedGroceryListFn
);

export const selectNotes = createSelector(
  selectNotesState,
  fromNotes.selectNotesFn
);

export const selectNotesCount = createSelector(
  selectNotesState,
  fromNotes.selectNotesCountFn
);

export const selectChosenGroceriesCount = createSelector(
  selectGroceryState,
  fromGrocery.selectChosenGroceriesCountFn
);
