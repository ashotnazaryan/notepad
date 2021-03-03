import { Component } from '@angular/core';

import { ClockSize } from '@shared/models';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {
  readonly ClockSize = ClockSize;
  dateFormat = 'dddd DD/MM/YYYY';
  timeFormat = 'HH:mm:ss';
}
