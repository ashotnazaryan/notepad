import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

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
  readonly ClockSize = ClockSize;

  dateTime$?: Observable<string>;

  constructor(
    dateService: DateService
  ) {
    this.dateTime$ = dateService.currentDateTime;
  }

  ngOnInit(): void {

  }

}
