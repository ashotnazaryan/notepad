import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { map } from 'rxjs/operators';

import { APP_CONFIGS } from '@core/config';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private currentDateTime$: Observable<string> = timer(0, 1000).pipe(
    map((_) => new Date()),
    map((currentTime) => moment(currentTime).format(APP_CONFIGS.DATE_TIME_FORMAT))
  );
  constructor() { }

  get currentDateTime(): Observable<string> {
    return this.currentDateTime$;
  }
}
