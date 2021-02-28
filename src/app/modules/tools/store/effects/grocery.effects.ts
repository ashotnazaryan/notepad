import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { GroceryActions } from '../actions';

@Injectable()
export class GroceryEffects {
  setNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroceryActions.SetChosenGroceryList),
      map((action) => action.chosenGroceryList),
      map((groceries) => GroceryActions.SetChosenGroceriesCount({ chosenGroceriesCount: groceries.length }))
    )
  );

  constructor(
    private actions$: Actions
  ) { }
}