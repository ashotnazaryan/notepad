import { createSelector } from '@ngrx/store';

import { State, groceryFeatureKey } from '../reducers/grocery.reducer';
import { selectToolsState } from '../reducers';

const selectChosenGroceryListFn = (state: State): State['chosenGroceryList'] =>
  state?.chosenGroceryList;

const selectChosenGroceriesCountFn = (
  state: State
): State['chosenGroceriesCount'] => state?.chosenGroceriesCount;

const selectSelectedGroceryListFn = (
  state: State
): State['selectedGroceryList'] => state?.selectedGroceryList;

export const selectGroceryState = createSelector(selectToolsState, (state) => {
  return state && state[groceryFeatureKey];
});

export const selectChosenGroceryList = createSelector(
  selectGroceryState,
  selectChosenGroceryListFn
);

export const selectSelectedGroceryList = createSelector(
  selectGroceryState,
  selectSelectedGroceryListFn
);

export const selectChosenGroceriesCount = createSelector(
  selectGroceryState,
  selectChosenGroceriesCountFn
);
