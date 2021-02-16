import { Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

export enum ButtonSize {
  small,
  large
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() color: string = 'primary';
  @Input() size: ButtonSize = ButtonSize.large;
  @Input() icon?: string;
  @Input() text?: string;
  @Output() readonly clicked = new EventEmitter<void>();
  @ContentChild('customTemplate', { static: true }) customTemplate?: TemplateRef<any>;

  readonly ButtonSize = ButtonSize;

  constructor() { }

  ngOnInit(): void {
    
  }

  handleClick = () => {
    this.clicked.emit();
  }

}
