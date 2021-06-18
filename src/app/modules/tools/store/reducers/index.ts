import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';
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
