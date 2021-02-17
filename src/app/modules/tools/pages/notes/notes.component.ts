import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

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
      langKey: 'PAPER_TYPE_YELLOW',
      name: this.translate.instant('PAPER_TYPE_YELLOW')
    },
    {
      key: 'white',
      langKey: 'PAPER_TYPE_WHITE',
      name: this.translate.instant('PAPER_TYPE_WHITE')
    },
    {
      key: 'black',
      langKey: 'PAPER_TYPE_BLACK',
      name: this.translate.instant('PAPER_TYPE_BLACK')
    }
  ];
  paperType: Note['key'] = this.paperTypes[0].key;

  constructor(
    private fb: FormBuilder,
    private file: FileService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.form = this.fb.group({
      paper: null
    });
  }

  ngOnInit(): void {
    this.handleLanguageChange();
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
          this.snackBar.open(error, 'Close'); // TODO create a snackbar component
        }
      );
  }

  clear = (): void => {
    this.form.reset();
  }

  handleLanguageChange = (): void => {
    this.translate.onLangChange.subscribe((data) => {
      // TODO find better way
      this.paperTypes = this.paperTypes.map((paperType) => {
        return {
          ...paperType,
          name: data.translations[paperType.langKey]
        }
      });
    });
  }

}
