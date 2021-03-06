import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
  MatSnackBarConfig
} from '@angular/material/snack-bar';

import { ButtonSize } from '@shared/models';

export enum NotificationType {
  success,
  error
}

export interface NotificationData {
  type: NotificationType;
  message: string;
}

export type NotificationOptions = Omit<MatSnackBarConfig, 'data'> & {
  data: NotificationData;
};

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  readonly ButtonSize = ButtonSize;
  readonly NotificationType = NotificationType;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData,
    public snackRef: MatSnackBarRef<NotificationComponent>
  ) {}

  handleClick(): void {
    this.snackRef.dismiss();
  }
}
