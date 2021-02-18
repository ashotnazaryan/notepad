import { createReducer, on } from '@ngrx/store';

import { GroceryPageActions } from '../actions';
import { Grocery } from '@modules/tools/pages/grocery/models/grocery';

export const groceryFeatureKey = 'grocery';

export interface State {
  chosenGroceryList: Array<Grocery>;
  selectedGroceryList: Array<Grocery>;
}

const initialState: State = {
  chosenGroceryList: [],
  selectedGroceryList: []
};

export const reducer = createReducer(
  initialState,
  on(GroceryPageActions.SetChosenGroceryList, (state, { chosenGroceryList }) => ({
    ...state,
    chosenGroceryList,
  })),

  on(GroceryPageActions.SetSelectedGroceryList, (state, { selectedGroceryList }) => ({
    ...state,
    selectedGroceryList,
  }))
);

export const selectChosenGroceryListFn = (state: State) => state.chosenGroceryList;
export const selectSelectedGroceryListFn = (state: State) => state.selectedGroceryList;