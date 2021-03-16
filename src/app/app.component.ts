import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import firebase from 'firebase/app';

import { environment } from '@environments/environment';
import { APP_CONFIGS } from '@core/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  defaultLanguageKey = APP_CONFIGS.DEFAULT_LANGUAGE_KEY;

  constructor() {
    moment.locale(this.defaultLanguageKey);
  }

  ngOnInit(): void {
    this.initFirebase();
  }

  private initFirebase = (): void => {
    firebase.initializeApp(environment.FIREBASE);
  };
}
