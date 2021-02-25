import { Component } from '@angular/core';

import { ClockSize } from '@shared/components/clock/clock.component';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {
  readonly ClockSize = ClockSize;
}
