import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

import { APP_CONFIGS } from '@core/config';
import { DateService } from '@core/services/date.service';

export enum ClockSize {
  small,
  large
}

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {
  @Input() size: ClockSize = ClockSize.small;
  @Input() format = APP_CONFIGS.DATE_TIME_LONG_FORMAT;

  readonly ClockSize = ClockSize;
  private unsubscribe$ = new Subject();
  dateTime$?: Observable<string>;

  constructor(
    private dateService: DateService
  ) {

  }

  ngOnInit(): void {
    this.dateTime$ = this.dateService.getCurrentDate(this.format)
    .pipe(
      takeUntil(this.unsubscribe$)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
