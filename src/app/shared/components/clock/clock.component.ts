import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { DateService } from '@core/services/date.service';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  dateTime$?: Observable<string>;

  constructor(
    dateService: DateService
  ) {
    this.dateTime$ = dateService.currentDateTime;
  }

  ngOnInit(): void {

  }

}
