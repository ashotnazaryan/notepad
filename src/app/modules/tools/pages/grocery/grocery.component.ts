import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { differenceWith, lowerCase } from 'lodash';

import { Grocery, ButtonSize } from '@shared/models';
import { NotificationType } from '@shared/components/notification/notification.component';
import { NotificationService } from '@shared/services';
import * as fromGrocery from '@shared/store/reducers';
import { ToolsActions } from '@shared/store/actions';
import { selectSelectedGroceryList } from '@shared/store/selectors';
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
    .select(selectSelectedGroceryList)
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
        ToolsActions.SetSelectedGroceryList({
          selectedGroceryList: this.groceries
        })
      );
    });
  };

  updateChosenGroceries = (items: Array<Grocery>): void => {
    this.groceries = items;
  };

  updateSelectedGroceries = (item: Grocery): void => {
    this.groceries = this.groceries.filter(({ key }) => key !== item.key);
    this.store.dispatch(
      ToolsActions.SetSelectedGroceryList({
        selectedGroceryList: this.groceries
      })
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
      ToolsActions.SetSelectedGroceryList({
        selectedGroceryList: this.groceries
      })
    );
  };

  remind = (): void => {
    const chosenGroceries = this.groceries.filter(({ checked }) => checked);

    if (!chosenGroceries?.length) {
      this.notification.showNotification('NOTIFICATIONS_EMPTY_GROCERY_LIST');

      return;
    }

    this.groceries = differenceWith(
      this.groceries,
      chosenGroceries,
      (a, b) => a.key === b.key
    );
    this.store.dispatch(
      ToolsActions.SetChosenGroceryList({ chosenGroceryList: chosenGroceries })
    );
    this.store.dispatch(
      ToolsActions.SetSelectedGroceryList({
        selectedGroceryList: this.groceries
      })
    );
    this.notification.showNotification(
      'NOTIFICATIONS_ADDED_GROCERY',
      NotificationType.success
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
      ToolsActions.SetSelectedGroceryList({
        selectedGroceryList: this.groceries
      })
    );
    this.customItem.reset();
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
