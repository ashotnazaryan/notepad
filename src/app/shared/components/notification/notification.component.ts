import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA, MatSnackBarConfig } from '@angular/material/snack-bar';

import { ButtonSize } from '@shared/components/button/button.component';

export enum NotificationType {
  success,
  error
}

export interface NotificationData {
  type: NotificationType;
  message: string;
}

export type NotificationOptions = Omit<MatSnackBarConfig, 'data'> & { data: NotificationData };

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  readonly ButtonSize = ButtonSize;
  readonly NotificationType = NotificationType;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData,
    public snackRef: MatSnackBarRef<NotificationComponent>,
  ) {
    
  }

  ngOnInit(): void {

  }

  handleClick(): void {
    this.snackRef.dismiss();
  }

}
