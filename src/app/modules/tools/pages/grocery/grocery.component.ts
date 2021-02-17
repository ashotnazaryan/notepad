import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { ButtonSize } from '@shared/components/button/button.component';
import * as fromGrocery from '@modules/tools/store/reducers';
import { SetSelectedGroceryList } from '@modules/tools/store/actions/grocery.actions';
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
  selectedGroceries: Array<Grocery> = [];
  readonly ButtonSize = ButtonSize;

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    private store: Store<fromGrocery.State>,
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
    });
  }

  updateGroceries = (event: MatSelectionListChange): void => {
    const selected = event.options.some((item) => item.selected);
    const value = event.options.map((item) => item.value)[0] as Grocery;

    this.selectedGroceries = selected
      ? [...this.selectedGroceries, value]
      : this.selectedGroceries.filter(({ key }) => key !== value.key);
  }

  removeItem = (event: MouseEvent, grocery: Grocery): void => {
    event.stopPropagation();
    this.groceries = this.groceries.filter(({ key }) => key !== grocery.key);
  }

  add = (): void => {
    this.store.dispatch(SetSelectedGroceryList({ selectedGroceryList: this.selectedGroceries }));
    this.groceries = [];
  }

}
