import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { differenceWith, findIndex } from 'lodash';

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

  @Output() readonly checkChanged: EventEmitter<Array<Grocery>> = new EventEmitter();
  @Output() readonly itemRemoved: EventEmitter<Grocery> = new EventEmitter();

  form: FormGroup = this.formBuilder.group({});
  groceriesArr: FormArray = this.form.get('groceries') as FormArray;
  readonly ButtonSize = ButtonSize;

  constructor(
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.initFormControls();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.data.firstChange && changes.data.currentValue?.length && this.editable) {
      this.updateFormControls();
    }
  }

  handleRemoveClick = (event: MouseEvent, item: Grocery, index: number): void => {
    event.stopPropagation();

    this.removeItem(index);
    this.itemRemoved.emit(item);
  }

  private initFormControls = (): void => {
    const formArray = this.data.map((item) => this.createNewItem(item));

    this.groceriesArr = new FormArray(formArray);
    this.form = this.formBuilder.group({ groceries: this.groceriesArr });

    this.form.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe((formValue: { groceries: Array<Grocery> }) => {
        this.checkChanged.emit(formValue.groceries);
      });
  }

  private updateFormControls = (): void => {
    const groceries = this.groceriesArr.value as Array<Grocery>;
    const newItems = differenceWith(this.data, groceries, (a, b) => a.key === b.key);
    const removedItems = differenceWith(groceries, this.data, (a, b) => a.key === b.key);

    if (newItems.length) {
      newItems.forEach((item) => this.addItem(item));

      return
    }

    if (removedItems.length) {
      removedItems.forEach((item) => {
        const index = findIndex(this.groceriesArr.value, item); // Because this.groceriesArr changes after the removeItem

        this.removeItem(index);
      });

      return;
    }
  }

  private createNewItem = (item?: Grocery): FormGroup => {
    return this.formBuilder.group({
      // TODO use spread operator
      key: item?.key,
      notes: { value: item?.notes, disabled: !this.editable },
      checked: item?.checked,
      icon: item?.icon,
      langKey: item?.langKey,
      value: item?.value
    });
  }

  private addItem = (item?: Grocery): void => {
    this.groceriesArr.push(this.createNewItem(item));
  }

  private removeItem = (index: number): void => {
    this.groceriesArr.removeAt(index);
  }

}
