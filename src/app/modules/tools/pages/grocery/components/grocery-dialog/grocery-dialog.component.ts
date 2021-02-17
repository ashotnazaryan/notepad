import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
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
export class GroceryDialogComponent implements OnInit, OnDestroy {
  @Output() readonly grocerySelected = new EventEmitter<Grocery>();

  constructor(
    private dialogRef: MatDialogRef<GroceryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroceryDialogData
  ) { }

  ngOnInit(): void {

  }

  handleClick = (item: Grocery): void => {
    item.selected = !item.selected;
    this.grocerySelected.emit(item);
  }

  ngOnDestroy(): void {
    
  }

}
