import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { differenceWith, findIndex } from 'lodash';

import { Grocery } from '@shared/models/grocery';
import { ButtonSize } from '@shared/components/button/button.component';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroceryListComponent implements OnInit {
  @Input() data: Array<Grocery> = [];
  @Input() editable = true;

  @Output() readonly itemChecked: EventEmitter<Array<Grocery>> = new EventEmitter();
  @Output() readonly itemRemoved: EventEmitter<Grocery> = new EventEmitter();
  @Output() readonly allChecked: EventEmitter<boolean> = new EventEmitter();
  @Output() readonly allRemoved: EventEmitter<void> = new EventEmitter();

  private unsubscribe$ = new Subject();
  form: FormGroup = this.formBuilder.group({});
  groceriesArr: FormArray = this.form.get('groceries') as FormArray;
  readonly ButtonSize = ButtonSize;

  // TODO find better way, performance issue
  get intermediate(): boolean {
    const groceries = this.groceriesArr.value as Array<Grocery>;

    return !this.allCheck && groceries.some(({ checked }) => checked);
  }

  // TODO find better way, performance issue
  get allCheck(): boolean {
    const groceries = this.groceriesArr.value as Array<Grocery>;

    return !!groceries.length && groceries.every(({ checked }) => checked);
  }

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

  handleRemoveAll = (): void => {
    this.data.forEach((item) => {
      const index = findIndex(this.groceriesArr.value, item); // NOTE Because this.groceriesArr changes after the removeItem

      this.removeItem(index);
    });

    this.allRemoved.emit();
  }

  private initFormControls = (): void => {
    const formArray = this.data.map((item) => this.createNewItem(item));

    this.groceriesArr = new FormArray(formArray);

    this.form = this.formBuilder.group({
      selectAll: false,
      groceries: this.groceriesArr
    });

    this.form.get('groceries')?.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe((groceries: Array<Grocery>) => {
        this.itemChecked.emit(groceries);
      });

    this.form.get('selectAll')?.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe((selectAll: boolean) => {
        const allCheckedGroceries = this.data.map((item) => ({
          ...item,
          checked: selectAll
        }));

        this.groceriesArr.patchValue(allCheckedGroceries);
        this.allChecked.emit(selectAll)
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
        const index = findIndex(this.groceriesArr.value, item); // NOTE Because this.groceriesArr changes after the removeItem

        this.removeItem(index);
      });

      return;
    }

    this.groceriesArr.patchValue(this.data);
  }

  private createNewItem = (item?: Grocery): FormGroup => {
    return this.formBuilder.group({
      // TODO use spread operator
      key: item?.key,
      notes: item?.notes,
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
