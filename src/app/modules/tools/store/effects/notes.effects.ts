import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import { NotesActions } from '../actions';

@Injectable()
export class NotesEffects {
  setNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.SetNotes),
      map((action) => action.notes),
      map((notes) => NotesActions.SetNotesCount({ count: notes.length }))
    )
  );

  constructor(
    private actions$: Actions
  ) { }
}