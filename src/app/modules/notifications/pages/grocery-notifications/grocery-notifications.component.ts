import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromTools from '@modules/tools/store/reducers';
import { Grocery } from '@modules/tools/pages/grocery/models/grocery';

@Component({
  selector: 'app-grocery-notifications',
  templateUrl: './grocery-notifications.component.html',
  styleUrls: ['./grocery-notifications.component.scss']
})
export class GroceryNotificationsComponent implements OnInit {
  groceries$: Observable<Array<Grocery>> = this.store.select(fromTools.selectSelectedGroceryList)
    .pipe(map((selectedGroceryList) => selectedGroceryList));

  constructor(
    private store: Store<fromTools.State>,
  ) { }

  ngOnInit(): void {
  }

}
