import { createReducer, on } from '@ngrx/store';
import { unionBy } from 'lodash';

import { Grocery } from '@shared/models';
import { GroceryActions } from '../actions';

export const groceryFeatureKey = 'grocery';

export interface State {
  chosenGroceryList: Array<Grocery>;
  chosenGroceriesCount: number;
  selectedGroceryList: Array<Grocery>;
}

const initialState: State = {
  chosenGroceryList: [],
  chosenGroceriesCount: 0,
  selectedGroceryList: []
};

export const reducer = createReducer(
  initialState,

  on(GroceryActions.SetChosenGroceryList, (state, { chosenGroceryList }) => ({
    ...state,
    chosenGroceryList: unionBy(
      chosenGroceryList,
      state.chosenGroceryList,
      'key'
    )
  })),

  on(
    GroceryActions.SetChosenGroceriesCount,
    (state, { chosenGroceriesCount }) => ({
      ...state,
      chosenGroceriesCount
    })
  ),

  on(
    GroceryActions.SetSelectedGroceryList,
    (state, { selectedGroceryList }) => ({
      ...state,
      selectedGroceryList
    })
  )
);
