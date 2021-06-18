import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider';
import * as generator from 'generate-password-browser';

import { ButtonSize } from '@shared/components/button/button.component';
import { NotificationType } from '@shared/components/notification/notification.component';
import { NotificationService } from '@shared/services';

type GeneratorOptions = generator.Options & { password?: string };

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.scss']
})
export class PasswordGeneratorComponent implements OnInit {
  form: FormGroup = this.formBuilder.group({});
  hidePassword = true;
  initialValue: GeneratorOptions = {
    length: 12,
    uppercase: true,
    numbers: true,
    symbols: true,
    excludeSimilarCharacters: true,
    password: ''
  };
  readonly ButtonSize = ButtonSize;

  constructor(
    private formBuilder: FormBuilder,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.initialValue);
  }

  handleChange = ({ value }: MatSliderChange): void => {
    this.form.get('length')?.setValue(value);
  };

  generate = (): void => {
    const formValue: GeneratorOptions = this.form.value;
    const { length, numbers, symbols, uppercase, excludeSimilarCharacters } =
      formValue;
    const options: GeneratorOptions = {
      length,
      numbers,
      symbols,
      uppercase,
      excludeSimilarCharacters
    };
    const password = generator.generate(options);

    this.form.get('password')?.setValue(password);
  };

  clear = (): void => {
    this.form.reset(this.initialValue);
  };

  handleCopy = (copied: boolean): void => {
    if (!this.form.get('password')?.value) {
      this.notification.showNotification('NOTIFICATIONS_EMPTY_GENERATED_PASSWORD');

      return;
    }

    if (copied) {
      this.notification.showNotification(
        'NOTIFICATIONS_COPIED_CLIPBOARD',
        NotificationType.success
      );
    }
  };
}
