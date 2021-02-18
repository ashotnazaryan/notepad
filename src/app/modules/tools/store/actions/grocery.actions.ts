import { createAction, props } from '@ngrx/store';

import { Grocery } from '@modules/tools/pages/grocery/models/grocery';

export const SetChosenGroceryList = createAction(
  '[Grocery] Set chosen grocery list',
  props<{ chosenGroceryList: Array<Grocery> }>()
);

export const SetSelectedGroceryList = createAction(
  '[Grocery] Set selected grocery list',
  props<{ selectedGroceryList: Array<Grocery> }>()
);