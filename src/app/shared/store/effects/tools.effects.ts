import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { ToolsActions } from '../actions';
import * as fromTools from '../reducers';
import { selectChosenGroceryList, selectNotes } from '../selectors';

@Injectable()
export class ToolsEffects {
  setChosenGroceryList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToolsActions.SetChosenGroceryList),
      switchMap(() => this.store.pipe(select(selectChosenGroceryList))),
      map((chosenGroceryList) => 
        ToolsActions.SetChosenGroceriesCount({
          chosenGroceriesCount: chosenGroceryList.length
        })
      )
    )
  );

  setNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ToolsActions.SetNotes),
      switchMap(() => this.store.pipe(select(selectNotes))),
      map((notes) => ToolsActions.SetNotesCount({ notesCount: notes.length }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromTools.State>
  ) { }
}
