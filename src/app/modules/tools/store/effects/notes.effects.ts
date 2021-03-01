import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { NotesActions } from '../actions';
import * as fromTools from '../reducers';
import { selectNotes } from '../reducers';

@Injectable()
export class NotesEffects {
  setNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.SetNotes),
      switchMap(() => this.store.pipe(select(selectNotes))),
      map((notes) => NotesActions.SetNotesCount({ count: notes.length }))
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<fromTools.State>
  ) { }
}