import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

import * as fromTools from '@modules/tools/store/reducers';
import { Grocery } from '@shared/models/grocery';

export interface GroceryDialogData {
  title: string;
  content: Array<Grocery>;
}

export type GroceryDialogOptions = Omit<MatDialogConfig, 'data'> & { data: GroceryDialogData };

@Component({
  selector: 'app-grocery-dialog',
  templateUrl: './grocery-dialog.component.html',
  styleUrls: ['./grocery-dialog.component.scss']
})
export class GroceryDialogComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();

  @Output() readonly grocerySelected = new EventEmitter<Grocery>();

  groceries: Array<Grocery> = [];
  selectedGroceries$: Observable<Array<Grocery>> = this.store.select(fromTools.selectSelectedGroceryList)
    .pipe(
      takeUntil(this.unsubscribe$)
    );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GroceryDialogData,
    private dialogRef: MatDialogRef<GroceryDialogComponent>,
    private store: Store<fromTools.State>
  ) {

  }

  ngOnInit(): void {
    this.selectedGroceries$.subscribe((data) => {
      // TODO fix, without changing the reference of this.groceries
      this.groceries = this.data.content.map((item) => {
        const selected = !!data.find(({ key }) => key === item.key)?.selected;

        return {
          ...item,
          selected
        }
      });
    });
  }

  handleClick = (item: Grocery): void => {
    this.grocerySelected.emit(item);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
