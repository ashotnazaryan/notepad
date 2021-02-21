import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { differenceWith } from 'lodash';

import { ButtonSize } from '@shared/components/button/button.component';
import {
  NotificationComponent,
  NotificationOptions,
  NotificationData,
  NotificationType
} from '@shared/components/notification/notification.component';
import * as fromGrocery from '@modules/tools/store/reducers';
import * as fromTools from '@modules/tools/store/reducers';
import { Grocery } from '@shared/models/grocery';
import { SetChosenGroceryList, SetSelectedGroceryList } from '@modules/tools/store/actions/grocery.actions';
import { groceryItems } from './constants/items';
import { GroceryDialogComponent, GroceryDialogOptions } from './components/grocery-dialog/grocery-dialog.component';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent implements OnInit {
  private unsubscribe$ = new Subject();
  private groceryItems = groceryItems;
  groceries: Array<Grocery> = [];
  groceries$: Observable<Array<Grocery>> =
    this.store.select(fromTools.selectSelectedGroceryList)
      .pipe(
        takeUntil(this.unsubscribe$)
      );
  chosenGroceries: Array<Grocery> = [];
  readonly ButtonSize = ButtonSize;
  readonly NotificationType = NotificationType;

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    private store: Store<fromGrocery.State>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.groceries$.subscribe((groceries) => {
      this.groceries = groceries;
    });
  }

  openDialog = (): void => {
    const options: GroceryDialogOptions = {
      width: '80vw',
      data: {
        title: this.translate.instant('GROCERY_CHOOSE_CATEGORY'),
        content: this.groceryItems
      }
    }

    const dialogRef = this.dialog.open(GroceryDialogComponent, options);

    dialogRef.componentInstance.grocerySelected.subscribe((item) => {
      const newItem = {
        ...item,
        checked: !!item.checked
      };

      this.groceries = newItem.selected
        ? [...this.groceries, newItem]
        : this.groceries.filter(({ key }) => key !== newItem.key);

      this.store.dispatch(SetSelectedGroceryList({ selectedGroceryList: this.groceries }));
    });
  }

  updateGroceries = (items: Array<Grocery>): void => {
    this.chosenGroceries = items.filter(({ checked }) => checked);
  }

  removeItem = (item: Grocery): void => {
    this.groceries = this.groceries.filter(({ key }) => key !== item.key);
    this.store.dispatch(SetSelectedGroceryList({ selectedGroceryList: this.groceries }));
  }

  addToGroceries = (): void => {
    if (!this.chosenGroceries.length) {
      this.showNotification(NotificationType.error, 'NOTIFICATIONS_EMPTY_GROCERY_LIST');

      return;
    }

    this.groceries = differenceWith(this.groceries, this.chosenGroceries, (a, b) => a.key === b.key);
    this.store.dispatch(SetChosenGroceryList({ chosenGroceryList: this.chosenGroceries }));
    this.store.dispatch(SetSelectedGroceryList({ selectedGroceryList: this.groceries }));
    this.showNotification(NotificationType.success, 'NOTIFICATIONS_ADDED_GROCERY');
    this.chosenGroceries = [];
  }

  private showNotification = (type: NotificationData['type'], message: NotificationData['message']): void => {
    const options: NotificationOptions = {
      data: {
        type,
        message
      }
    };

    this.snackBar.openFromComponent(NotificationComponent, options);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
