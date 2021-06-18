import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  NotificationComponent,
  NotificationData,
  NotificationType
} from '@shared/components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) { }

  showNotification = (
    message: NotificationData['message'] = 'NOTIFICATIONS_COMMON_SOMETHING_WENT_WRONG',
    type: NotificationData['type'] = NotificationType.error
  ): void => {
    const options: NotificationOptions = {
      data: {
        message,
        type
      }
    };

    this.snackBar.openFromComponent(NotificationComponent, options);
  };
}
