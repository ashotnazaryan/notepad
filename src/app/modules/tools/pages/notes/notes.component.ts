import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

import { FileService } from '@core/services/file.service';
import {
  NotificationComponent,
  NotificationOptions,
  NotificationData,
  NotificationType
} from '@shared/components/notification/notification.component';
import { KeyName } from '@shared/models';
import * as fromTools from '@modules/tools/store/reducers';
import { SetNotes } from '@modules/tools/store/actions/notes.actions';
import { paperTypes } from './constants/paper-types';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  private unsubscribe$ = new Subject();
  form: FormGroup = this.formBuilder.group({ paper: null });
  paperTypes = paperTypes;
  paperType: KeyName['key'] = this.paperTypes[0].key;

  notes$: Observable<Array<string>> =
    this.store.select(fromTools.selectNotes)
      .pipe(
        takeUntil(this.unsubscribe$)
      );

  notes: Array<string> = [];

  constructor(
    private formBuilder: FormBuilder,
    private file: FileService,
    private snackBar: MatSnackBar,
    private store: Store<fromTools.State>
  ) {

  }

  ngOnInit(): void {
    this.notes$.subscribe((notes) => {
      this.notes = notes;
      // this.form.patchValue({ paper: notes[0] });
    });
  }

  handlePaperTypeChange = ({ value }: MatSelectChange): void => {
    this.paperType = value;
  }

  save = (): void => {
    const data = this.form.value?.paper;

    if (!data) {
      this.showNotification(NotificationType.error, 'NOTIFICATIONS_SAVE_EMPTY_NOTES');

      return;
    }

    this.file.download(data, undefined, 'notes.txt');
  }

  upload = (file: File): void => {
    this.file.upload(file)
      .subscribe(
        (data) => {
          this.form.setValue({ paper: data });
        },
        (error) => {
          this.showNotification(NotificationType.error, error);
        }
      );
  }

  remind = (): void => {
    const data = this.form.value?.paper as string;

    if (!data) {
      this.showNotification(NotificationType.error, 'NOTIFICATIONS_REMIND_EMPTY_NOTES');

      return;
    }

    this.notes = [
      ...this.notes,
      data
    ];

    this.store.dispatch(SetNotes({ notes: this.notes }));
    this.showNotification(NotificationType.success, 'NOTIFICATIONS_ADDED_NOTES');
    this.clear();
  }

  clear = (): void => {
    this.form.reset();
  }

  private showNotification = (type: NotificationData['type'], message: NotificationData['message']): void => {
    const options: NotificationOptions = {
      data: {
        type,
        message
      }
    }

    this.snackBar.openFromComponent(NotificationComponent, options);
  }

}
