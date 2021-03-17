import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import firebase from 'firebase/app';

import { environment } from '@environments/environment';
import { APP_CONFIGS } from '@core/config';
import * as fromRoot from '@shared/store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private unsubscribe$ = new Subject();
  defaultLanguageKey = APP_CONFIGS.DEFAULT_LANGUAGE_KEY;
  appLoading$: Observable<boolean> = this.store
    .select(fromRoot.selectLoading)
    .pipe(takeUntil(this.unsubscribe$));

  constructor(private store: Store<fromRoot.State>) {
    moment.locale(this.defaultLanguageKey);
  }

  ngOnInit(): void {
    this.initFirebase();
  }

  private initFirebase = (): void => {
    firebase.initializeApp(environment.FIREBASE);
  };
}
