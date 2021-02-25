import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FileService } from '@core/services/file.service';
import { 
  NotificationComponent, 
  NotificationOptions, 
  NotificationData, 
  NotificationType 
} from '@shared/components/notification/notification.component';
import { KeyName } from '@shared/models';
import { paperTypes } from './constants/paper-types';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent {
  form: FormGroup;
  paperTypes: Array<KeyName> = paperTypes;
  paperType: KeyName['key'] = this.paperTypes[0].key;

  constructor(
    private formBuilder: FormBuilder,
    private file: FileService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      paper: null
    });
  }

  handlePaperTypeChange = ({ value }: MatSelectChange): void => {
    this.paperType = value;
  }

  save = (): void => {
    const data = this.form.value?.paper;

    if (!data) {
      this.showNotification(NotificationType.error, 'NOTIFICATIONS_EMPTY_NOTES');

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
