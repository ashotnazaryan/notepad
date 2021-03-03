import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() strokeWidth = 3;
  @Input() diameter = 50;
  @Input() className = '';
  @Input() absolute = false;
}
