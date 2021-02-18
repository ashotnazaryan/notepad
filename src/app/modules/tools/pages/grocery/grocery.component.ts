import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { differenceWith, isEqual } from 'lodash';

import { ButtonSize } from '@shared/components/button/button.component';
import { NotificationComponent, NotificationType } from '@shared/components/notification/notification.component';
import * as fromGrocery from '@modules/tools/store/reducers';
import { SetChosenGroceryList, SetSelectedGroceryList } from '@modules/tools/store/actions/grocery.actions';
import { GroceryDialogComponent, GroceryDialogData } from './components/grocery-dialog/grocery-dialog.component';
import { groceryItems } from './constants/items';
import { Grocery } from './models/grocery';

type GroceryDialogOptions = MatDialogConfig & { data: GroceryDialogData }

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.scss']
})
export class GroceryComponent implements OnInit {
  groceries: Array<Grocery> = [];
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

  }

  openDialog = (): void => {
    const options: GroceryDialogOptions = {
      width: '80vw',
      data: {
        title: this.translate.instant('GROCERY_CHOOSE_CATEGORY'),
        content: groceryItems
      }
    }

    const dialogRef = this.dialog.open(GroceryDialogComponent, options);

    dialogRef.componentInstance.grocerySelected.subscribe((item) => {
      this.groceries = [
        ...this.groceries,
        item
      ].filter(({ selected }) => selected);

      this.store.dispatch(SetSelectedGroceryList({ selectedGroceryList: this.groceries }));
    });
  }

  updateGroceries = (item: Grocery): void => {
    this.chosenGroceries = item.selected
      ? [...this.chosenGroceries, item]
      : this.chosenGroceries.filter(({ key }) => key !== item.key);
  }

  removeItem = (grocery: Grocery): void => {
    this.groceries = this.groceries.filter(({ key }) => key !== grocery.key);
    this.store.dispatch(SetSelectedGroceryList({ selectedGroceryList: this.groceries }));
  }

  addToGroceries = (): void => {
    if (!this.chosenGroceries.length) {
      this.showNotification(NotificationType.error, 'NOTIFICATIONS_EMPTY_GROCERY_LIST');

      return;
    }

    this.groceries = differenceWith(this.groceries, this.chosenGroceries, isEqual);
    this.store.dispatch(SetChosenGroceryList({ chosenGroceryList: this.chosenGroceries }));
    this.store.dispatch(SetSelectedGroceryList({ selectedGroceryList: this.groceries }));
    this.showNotification(NotificationType.success, 'NOTIFICATIONS_ADDED_GROCERY');
  }

  private showNotification = (type: NotificationType, message: string) => {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        type,
        message
      }
    });
  }

}
