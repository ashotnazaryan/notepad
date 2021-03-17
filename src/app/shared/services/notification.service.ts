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
  constructor(private snackBar: MatSnackBar) {}

  showNotification = (
    type: NotificationData['type'] = NotificationType.error,
    message: NotificationData['message'] = 'NOTIFICATIONS_COMMON_SOMETHING_WENT_WRONG'
  ): void => {
    const options: NotificationOptions = {
      data: {
        type,
        message
      }
    };

    this.snackBar.openFromComponent(NotificationComponent, options);
  };
}
