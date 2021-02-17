import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

export enum ButtonSize {
  icon,
  small,
  large
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() disabled = false;
  @Input() color: string = 'default';
  @Input() size: ButtonSize = ButtonSize.large;
  @Input() icon?: string;
  @Input() text?: string;
  @Output() readonly clicked = new EventEmitter<MouseEvent>();
  @ContentChild('customTemplate', { static: true }) customTemplate?: TemplateRef<any>;

  readonly ButtonSize = ButtonSize;

  constructor() { }

  ngOnInit(): void {
    
  }

  handleClick = (event?: MouseEvent) => {
    this.clicked.emit(event);
  }

}
