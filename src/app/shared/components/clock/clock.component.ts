import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

import { APP_CONFIGS } from '@core/config';
import { DateService } from '@core/services/date.service';
import { ClockSize } from '@shared/models';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit, OnDestroy {
  @Input() size: ClockSize = ClockSize.small;
  @Input() dateFormat = APP_CONFIGS.DATE_TIME_FORMATS.date;
  @Input() timeFormat = APP_CONFIGS.DATE_TIME_FORMATS.time;

  readonly ClockSize = ClockSize;
  private unsubscribe$ = new Subject();
  date$?: Observable<string>;
  time$?: Observable<string>;

  constructor(private dateService: DateService) {}

  ngOnInit(): void {
    this.date$ = this.dateService
      .getCurrentDateTime(this.dateFormat)
      .pipe(takeUntil(this.unsubscribe$));

    this.time$ = this.dateService
      .getCurrentDateTime(this.timeFormat)
      .pipe(takeUntil(this.unsubscribe$));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
