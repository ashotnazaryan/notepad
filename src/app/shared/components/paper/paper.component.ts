import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

import { KeyName } from '@shared/models';

type ChangeFunction = (value: string) => '';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaperComponent),
      multi: true
    }
  ]
})
export class PaperComponent implements OnInit {
  @Input() size = 12;
  @Input() type?: KeyName['key'];

  textAreaControl = new FormControl('');
  onChange: ChangeFunction = () => '';
  onTouched: ChangeFunction = () => '';

  ngOnInit(): void {
    this.textAreaControl.valueChanges.subscribe((value: string) => {
      if (this.onChange) {
        this.onChange(value);
      }
    });
  }

  writeValue(value: string): void {
    this.textAreaControl.setValue(value);
  }

  registerOnChange(fn: ChangeFunction): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: ChangeFunction): void {
    this.onTouched = fn;
  }
}
