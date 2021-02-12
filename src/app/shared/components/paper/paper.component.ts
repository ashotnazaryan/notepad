import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  @Input() size = 20;
  @Input() type = 'yellow';

  textAreaControl = new FormControl('');
  onChange: Function = () => { };
  onTouched: Function = () => { };

  constructor() { 

  }

  ngOnInit(): void {
    this.textAreaControl.valueChanges
      .subscribe((value: string) => {
        if (this.onChange) {
          this.onChange(value);
        }
      });
  }

  writeValue(value: string): void {
    this.textAreaControl.setValue(value);
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

}
