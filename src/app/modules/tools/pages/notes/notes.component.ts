import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import * as moment from 'moment';

import { FileService, NotificationService } from '@shared/services';
import { NotificationType } from '@shared/components/notification/notification.component';
import { KeyName } from '@shared/models';
import * as fromTools from '@shared/store/reducers';
import { ToolsActions } from '@shared/store/actions';
import { selectNotes } from '@shared/store/selectors';
import { Note } from '@shared/models/note';
import { paperTypes } from './constants/paper-types';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  form: FormGroup = this.formBuilder.group({ paper: null });
  paperTypes = paperTypes;
  paperType: KeyName['key'] = this.paperTypes[0].key;

  notes$: Observable<Array<Note>> = this.store
    .select(selectNotes)
    .pipe(takeUntil(this.unsubscribe$));

  notes: Array<Note> = [];

  constructor(
    private formBuilder: FormBuilder,
    private file: FileService,
    private store: Store<fromTools.State>,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.notes$.subscribe((notes) => {
      this.notes = notes;
    });
  }

  handlePaperTypeChange = ({ value }: MatSelectChange): void => {
    this.paperType = value;
  };

  save = (): void => {
    const data = this.form.value?.paper;

    if (!data) {
      this.notification.showNotification('NOTIFICATIONS_SAVE_EMPTY_NOTES');

      return;
    }

    this.file.download(data, undefined, 'notes.txt');
  };

  upload = (file: File): void => {
    this.file.upload(file).subscribe(
      (data) => {
        this.form.setValue({ paper: data });
      },
      (error) => {
        this.notification.showNotification(error);
      }
    );
  };

  remind = (): void => {
    const data: Note = {
      createdAt: moment(new Date()).format('DD MMM YYYY, h:mm A'),
      text: this.form.value?.paper as string
    };

    if (!data.text) {
      this.notification.showNotification('NOTIFICATIONS_REMIND_EMPTY_NOTES');

      return;
    }

    this.notes = [...this.notes, data];

    this.store.dispatch(ToolsActions.SetNotes({ notes: this.notes }));
    this.notification.showNotification(
      'NOTIFICATIONS_ADDED_NOTES',
      NotificationType.success
    );
    this.clear();
  };

  clear = (): void => {
    this.form.reset();
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
