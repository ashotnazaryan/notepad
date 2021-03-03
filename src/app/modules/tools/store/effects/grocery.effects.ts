import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { GroceryActions } from '../actions';
import * as fromTools from '../reducers';
import { selectChosenGroceryList } from '../reducers';

@Injectable()
export class GroceryEffects {
  SetChosenGroceryList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroceryActions.SetChosenGroceryList),
      switchMap(() => this.store.pipe(select(selectChosenGroceryList))),
      map((chosenGroceryList) =>
        GroceryActions.SetChosenGroceriesCount({
          chosenGroceriesCount: chosenGroceryList.length
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromTools.State>
  ) {}
}
