import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

import * as fromTools from '@modules/tools/store/reducers';
import { Grocery } from '@shared/models';

@Component({
  selector: 'app-grocery-notifications',
  templateUrl: './grocery-notifications.component.html',
  styleUrls: ['./grocery-notifications.component.scss']
})
export class GroceryNotificationsComponent implements OnDestroy {
  private unsubscribe$ = new Subject();

  groceries$: Observable<Array<Grocery>> = this.store
    .select(fromTools.selectChosenGroceryList)
    .pipe(takeUntil(this.unsubscribe$));

  constructor(private store: Store<fromTools.State>) {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
