import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FileService } from '@core/services/file.service';
import { NotificationComponent, NotificationType } from '@shared/components/notification/notification.component';
import { KeyName } from '@shared/models';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  form: FormGroup;
  paperTypes: Array<KeyName> = [
    {
      key: 'yellow',
      name: 'PAPER_TYPE_YELLOW'
    },
    {
      key: 'white',
      name: 'PAPER_TYPE_WHITE'
    },
    {
      key: 'black',
      name: 'PAPER_TYPE_BLACK'
    }
  ];
  paperType: KeyName['key'] = this.paperTypes[0].key;

  constructor(
    private fb: FormBuilder,
    private file: FileService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      paper: null
    });
  }

  ngOnInit(): void {
    
  }

  handlePaperTypeChange = ({ value }: MatSelectChange): void => {
    this.paperType = value;
  }

  save = (): void => {
    const data = this.form.value?.paper;

    if (!data) {
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

  private showNotification = (type: NotificationType, message: string) => {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        type,
        message
      }
    });
  }

}
