import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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

  @Output() readonly selectionChanged: EventEmitter<Array<Grocery>> = new EventEmitter();
  @Output() readonly itemRemoved: EventEmitter<Grocery> = new EventEmitter();

  form: FormGroup = this.formBuilder.group({});

  groceriesArr: FormArray = this.form.get('groceries') as FormArray;
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

  handleRemoveClick = (event: MouseEvent, item: Grocery, i: number): void => {
    event.stopPropagation();

    this.groceriesArr.removeAt(i);
    this.itemRemoved.emit(item);
  }

  private initializeFormControls = (): void => {
    const formArray = this.data.map((item) => {
      return this.formBuilder.group({
        // TODO use spread operator
        key: item.key,
        notes: { value: item.notes, disabled: !this.editable },
        checked: item.checked,
        icon: item.icon,
        langKey: item.langKey,
        value: item.value
      });
    });

    this.groceriesArr = new FormArray(formArray);
    this.form = this.formBuilder.group({ groceries: this.groceriesArr });

    this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe((formValue: { groceries: Array<Grocery> }) => {
        const data = formValue.groceries.filter(({ checked }) => checked);

        this.selectionChanged.emit(data);
      });
  }

}
