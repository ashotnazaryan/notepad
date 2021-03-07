import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { differenceWith, lowerCase } from 'lodash';

import { Grocery } from '@shared/models';
import { NotificationType } from '@shared/components/notification/notification.component';
import { ButtonSize } from '@shared/components/button/button.component';
import { NotificationService } from '@shared/services';
import * as fromGrocery from '@modules/tools/store/reducers';
import * as fromTools from '@modules/tools/store/reducers';
import {
  SetChosenGroceryList,
  SetSelectedGroceryList
} from '@modules/tools/store/actions/grocery.actions';
import { groceryItems } from './constants/items';
import {
  GroceryDialogComponent,
  GroceryDialogOptions
} from './components/grocery-dialog/grocery-dialog.component';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent implements OnInit {
  private unsubscribe$ = new Subject();
  private groceryItems = groceryItems;
  groceries: Array<Grocery> = [];

  groceries$: Observable<Array<Grocery>> = this.store
    .select(fromTools.selectSelectedGroceryList)
    .pipe(takeUntil(this.unsubscribe$));

  customItem = new FormControl('', Validators.required);
  readonly ButtonSize = ButtonSize;
  readonly NotificationType = NotificationType;

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    private store: Store<fromGrocery.State>,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.groceries$.subscribe((groceries) => {
      this.groceries = groceries;
    });
  }

  openDialog = (): void => {
    const options: GroceryDialogOptions = {
      width: '300px',
      maxWidth: '80vw',
      data: {
        title: this.translate.instant('GROCERY_CHOOSE_CATEGORY'),
        content: this.groceryItems
      }
    };

    const dialogRef = this.dialog.open(GroceryDialogComponent, options);

    dialogRef.componentInstance.grocerySelected.subscribe((item) => {
      const newItem: Grocery = {
        ...item,
        checked: !!item.checked
      };

      this.groceries = newItem.selected
        ? [...this.groceries, newItem]
        : this.groceries.filter(({ key }) => key !== newItem.key);

      this.store.dispatch(
        SetSelectedGroceryList({ selectedGroceryList: this.groceries })
      );
    });
  };

  updateChosenGroceries = (items: Array<Grocery>): void => {
    this.groceries = items;
  };

  updateSelectedGroceries = (item: Grocery): void => {
    this.groceries = this.groceries.filter(({ key }) => key !== item.key);
    this.store.dispatch(
      SetSelectedGroceryList({ selectedGroceryList: this.groceries })
    );
  };

  checkAll = (checked: Grocery['checked']): void => {
    this.groceries = this.groceries.map((item) => ({
      ...item,
      checked
    }));
  };

  removeAll = (): void => {
    this.groceries = [];
    this.store.dispatch(
      SetSelectedGroceryList({ selectedGroceryList: this.groceries })
    );
  };

  remind = (): void => {
    if (!this.groceries.length) {
      this.notification.showNotification(
        NotificationType.error,
        'NOTIFICATIONS_EMPTY_GROCERY_LIST'
      );

      return;
    }

    const chosenGroceries = this.groceries.filter(({ checked }) => checked);

    this.groceries = differenceWith(
      this.groceries,
      chosenGroceries,
      (a, b) => a.key === b.key
    );
    this.store.dispatch(
      SetChosenGroceryList({ chosenGroceryList: chosenGroceries })
    );
    this.store.dispatch(
      SetSelectedGroceryList({ selectedGroceryList: this.groceries })
    );
    this.notification.showNotification(
      NotificationType.success,
      'NOTIFICATIONS_ADDED_GROCERY'
    );
  };

  addToGroceries = (): void => {
    if (this.customItem.invalid) {
      this.customItem.markAsTouched();

      return;
    }

    const formValue = this.customItem.value as Grocery['value'];
    const newItem: Grocery = {
      value: formValue,
      key: lowerCase(formValue),
      icon: 'assets/icons/grocery/cart.svg'
    };

    this.groceries = [...this.groceries, newItem];

    this.store.dispatch(
      SetSelectedGroceryList({ selectedGroceryList: this.groceries })
    );
    this.customItem.reset();
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
