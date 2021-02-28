import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/internal/Observable';
import { timer } from 'rxjs/internal/observable/timer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  getCurrentDate = (format: string): Observable<string> => {
    return timer(0, 1000).pipe(
      map((_) => new Date()),
      map((currentTime) => moment(currentTime).format(format))
    );
  }
}
