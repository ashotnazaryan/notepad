import { createReducer, on } from '@ngrx/store';
import { unionBy } from 'lodash';

import { Grocery } from '@shared/models/grocery';
import { GroceryPageActions } from '../actions';

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
    // TODO bug, update list with latest one and filter by unique
    chosenGroceryList: unionBy(chosenGroceryList, state.chosenGroceryList, 'key')
  })),

  on(GroceryPageActions.SetSelectedGroceryList, (state, { selectedGroceryList }) => ({
    ...state,
    selectedGroceryList,
  }))
  
);

export const selectChosenGroceryListFn = (state: State): Array<Grocery> => state.chosenGroceryList;
export const selectSelectedGroceryListFn = (state: State): Array<Grocery> => state.selectedGroceryList;