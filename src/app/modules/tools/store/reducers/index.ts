import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
} from '@ngrx/store';
import * as fromRoot from '@shared/store/reducers';
import * as fromGrocery from './grocery.reducer';

export const toolsFeatureKey = 'tools';

export interface ToolsState {
  [fromGrocery.groceryFeatureKey]: fromGrocery.State;
}

export interface State extends fromRoot.State {
  [toolsFeatureKey]: ToolsState;
}

export function reducers(state: ToolsState | undefined, action: Action) {
  return combineReducers({
    [fromGrocery.groceryFeatureKey]: fromGrocery.reducer,
  })(state, action);
}

export const selectToolsState = createFeatureSelector<State, ToolsState>(
  toolsFeatureKey
);

export const selectGroceryState = createSelector(
  selectToolsState,
  (state) => state[fromGrocery.groceryFeatureKey]
);

export const selectSelectedGroceryList = createSelector(
  selectGroceryState,
  fromGrocery.selectSelectedGroceryListFn
);