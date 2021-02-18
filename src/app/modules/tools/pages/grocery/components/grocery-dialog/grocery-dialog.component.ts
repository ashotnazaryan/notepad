import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Grocery } from '../../models/grocery';

export interface GroceryDialogData {
  title: string;
  content: Array<Grocery>;
}

@Component({
  selector: 'app-grocery-dialog',
  templateUrl: './grocery-dialog.component.html',
  styleUrls: ['./grocery-dialog.component.scss']
})
export class GroceryDialogComponent implements OnInit {
  @Output() readonly grocerySelected = new EventEmitter<Grocery>();
  groceries: Array<Grocery> = [];

  constructor(
    private dialogRef: MatDialogRef<GroceryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroceryDialogData
  ) {

  }

  // set selectedGroceries(data: Array<Grocery>) {
    // this.groceries.forEach((item) => {
    //   const selectedItem = data.find(({ key }) => key === item.key);

    //   item = {
    //     ...item,
    //     selected: selectedItem?.selected
    //   }
    // });
  // }

  ngOnInit(): void {
    this.groceries = this.data.content;
  }

  handleClick = (item: Grocery): void => {
    item.selected = !item.selected;
    this.grocerySelected.emit(item);
  }

}
