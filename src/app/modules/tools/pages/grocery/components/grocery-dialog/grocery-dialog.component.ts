import {
  ChangeDetectionStrategy,
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
  styleUrls: ['./grocery-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroceryDialogComponent implements OnInit, OnDestroy {
  @Output() readonly grocerySelected = new EventEmitter<Grocery>();

  private unsubscribe$ = new Subject();
  groceries: Array<Grocery> = [];
  selectedGroceries?: Array<Grocery>;
  selectedGroceries$: Observable<Array<Grocery>> =
    this.store.select(fromTools.selectSelectedGroceryList)
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
    this.groceries = this.data.content;

    this.selectedGroceries$.subscribe((selectedGroceries) => {
      this.selectedGroceries = selectedGroceries;
    });
  }

  handleClick = (item: Grocery): void => {
    item.selected = !item.selected;
    this.grocerySelected.emit(item);
  }

  // TODO find better way (use pipes or manually check). Performance issue
  selected = (item: Grocery): boolean => {
    const selectedGrocery = this.selectedGroceries?.find(({ key }) => item.key === key);

    return !!selectedGrocery?.selected;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
