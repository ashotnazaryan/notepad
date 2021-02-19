import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Grocery } from '@shared/models/grocery';
import { ButtonSize } from '@shared/components/button/button.component';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {
  @Input() data: Array<Grocery> = [];
  @Input() editable = true;
  @Input() multiple = true;

  @Output() readonly selectionChanged: EventEmitter<Grocery> = new EventEmitter();
  @Output() readonly itemRemoved: EventEmitter<Grocery> = new EventEmitter();

  form: FormGroup = this.formBuilder.group({});
  readonly ButtonSize = ButtonSize;

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue?.length) {
      this.initializeFormControls();
    }
  }

  handleSelectionChange = (event: MatSelectionListChange): void => {
    const item = event.options.map((item) => item.value)[0] as Grocery;
    const notes = this.form.value[item.key] as Grocery['notes'];

    this.selectionChanged.emit({ ...item, notes });
  }

  handleRemoveClick = (event: MouseEvent, item: Grocery): void => {
    event.stopPropagation();

    this.itemRemoved.emit(item);
  }

  private initializeFormControls = (): void => {
    const formFields = this.data.reduce((acc, item) => ({
      ...acc,
      [item.key]: { value: item.notes || '', disabled: !this.editable }
    }), {});

    this.form = this.formBuilder.group(formFields);
  }

}
