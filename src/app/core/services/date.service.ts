import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  getCurrentDateTime = (format: string): Observable<string> => {
    return timer(0, 1000).pipe(
      map(() => new Date()),
      map((currentDateTime) => moment(currentDateTime).format(format))
    );
  }
}
