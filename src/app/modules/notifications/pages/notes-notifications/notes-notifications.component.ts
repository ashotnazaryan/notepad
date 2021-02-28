import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

import * as fromTools from '@modules/tools/store/reducers';
import { Note } from '@modules/tools/pages/notes/models/note';

@Component({
  selector: 'app-notes-notifications',
  templateUrl: './notes-notifications.component.html',
  styleUrls: ['./notes-notifications.component.scss']
})
export class NotesNotificationsComponent implements OnDestroy {
  private unsubscribe$ = new Subject();

  notes$: Observable<Array<Note>> =
    this.store.select(fromTools.selectNotes)
      .pipe(takeUntil(this.unsubscribe$));

  constructor(
    private store: Store<fromTools.State>,
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
