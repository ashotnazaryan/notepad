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
import {
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { finalize, mergeMap, scan, takeUntil, tap } from 'rxjs/operators';
import { from } from 'rxjs/internal/observable/from';

import { Grocery } from '@shared/models';
import { loadImage } from '@shared/utils';
import * as fromTools from '@modules/tools/store/reducers';
import { selectSelectedGroceryList } from '@modules/tools/store/selectors';

export interface GroceryDialogData {
  title: string;
  content: Array<Grocery>;
}

export type GroceryDialogOptions = Omit<MatDialogConfig, 'data'> & {
  data: GroceryDialogData;
};

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

  selectedGroceries$: Observable<Array<Grocery>> = this.store
    .select(selectSelectedGroceryList)
    .pipe(takeUntil(this.unsubscribe$));

  loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: GroceryDialogData,
    private dialogRef: MatDialogRef<GroceryDialogComponent>,
    private store: Store<fromTools.State>
  ) {}

  ngOnInit(): void {
    const icons = this.data.content?.map(({ icon }) => icon);

    this.groceries = this.data.content?.map((item) => ({
      ...item,
      selected: false
    }));

    this.selectedGroceries$.subscribe((selectedGroceries) => {
      this.selectedGroceries = selectedGroceries;
    });

    this.handleIconsLoaded(icons);
  }

  handleClick = (item: Grocery): void => {
    item.selected = !item.selected;
    this.grocerySelected.emit(item);
  };

  // TODO find better way (use pipes or manually check). Performance issue
  selected = (item: Grocery): boolean => {
    return !!this.selectedGroceries?.find(({ key }) => item.key === key)
      ?.selected;
  };

  private handleIconsLoaded = (icons: Array<Grocery['icon']> = []): void => {
    from(icons)
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.loading$.next(true)),
        mergeMap(loadImage),
        scan(
          (acc, curr) => [...acc, curr],
          [] as Array<HTMLImageElement | string>
        ),
        finalize(() => this.loading$.next(false))
      )
      .subscribe();
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
