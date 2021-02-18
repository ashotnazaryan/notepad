import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

import { ButtonSize } from '@shared/components/button/button.component';

export enum NotificationType {
  success,
  error
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  readonly ButtonSize = ButtonSize;
  readonly NotificationType = NotificationType;

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public snackRef: MatSnackBarRef<NotificationComponent>,
  ) {

  }

  ngOnInit(): void {

  }

  handleClick(): void {
    this.snackRef.dismiss();
  }

}
