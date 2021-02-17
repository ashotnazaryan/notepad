import { createReducer, on } from '@ngrx/store';

import { GroceryPageActions } from '../actions';
import { Grocery } from '@modules/tools/pages/grocery/models/grocery';

export const groceryFeatureKey = 'grocery';

export interface State {
  selectedGroceryList: Array<Grocery>;
}

const initialState: State = {
  selectedGroceryList: []
};

export const reducer = createReducer(
  initialState,
  on(GroceryPageActions.SetSelectedGroceryList, (state, { selectedGroceryList }) => ({
    ...state,
    selectedGroceryList,
  }))
);

export const selectSelectedGroceryListFn = (state: State) => state.selectedGroceryList;