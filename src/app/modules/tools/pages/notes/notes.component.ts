import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FileService } from '@core/services/file.service';
import { Note } from './models/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  form: FormGroup;
  paperTypes: Array<Note> = [
    {
      key: 'yellow',
      name: 'Yellow'
    },
    {
      key: 'white',
      name: 'White'
    },
    {
      key: 'black',
      name: 'Black'
    }
  ];
  paperType = 'yellow';

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

  handlePaperTypeChange = (option: MatSelectChange): void => {
    this.paperType = option.value;
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
          this.snackBar.open(error, 'Close'); // TODO create a snackbar component
        }
      );
  }

  clear = (): void => {
    this.form.reset();
  }

}
