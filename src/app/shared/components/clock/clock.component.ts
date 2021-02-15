import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

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
export class ClockComponent implements OnInit {
  @Input() size: ClockSize = ClockSize.small;
  @Input() format = APP_CONFIGS.DATE_TIME_LONG_FORMAT;

  readonly ClockSize = ClockSize;
  dateTime$?: Observable<string>;

  constructor(
    private dateService: DateService
  ) {

  }

  ngOnInit(): void {
    this.dateTime$ = this.dateService.getCurrentDate(this.format);
  }

}
