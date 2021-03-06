import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';

import { ButtonSize } from '@shared/models';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() color = 'default';
  @Input() size: ButtonSize = ButtonSize.large;
  @Input() icon?: string;
  @Input() iconPosition?: 'left' | 'right' = 'left';
  @Input() text?: string;
  @Output() readonly clicked = new EventEmitter<MouseEvent>();
  @ContentChild('customTemplate', { static: true })
  customTemplate?: TemplateRef<ElementRef>;

  readonly ButtonSize = ButtonSize;

  handleClick = (event?: MouseEvent): void => {
    this.clicked.emit(event);
  };
}
