import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';

import { Grocery } from '@modules/tools/pages/grocery/models/grocery';
import { ButtonSize } from '@shared/components/button/button.component';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {
  @Input() data: Array<Grocery> = [];
  @Input() editable = true;

  @Output() readonly selectionChange: EventEmitter<Grocery> = new EventEmitter();
  @Output() readonly itemRemoved: EventEmitter<Grocery> = new EventEmitter();

  readonly ButtonSize = ButtonSize;

  constructor() { }

  ngOnInit(): void {

  }

  handleSelectionChange = (event: MatSelectionListChange): void => {
    const value = event.options.map((item) => item.value)[0] as Grocery;

    this.selectionChange.emit(value);
  }

  handleRemoveClick = (event: MouseEvent, item: Grocery): void => {
    event.stopPropagation();
    
    this.itemRemoved.emit(item);
  }

}
