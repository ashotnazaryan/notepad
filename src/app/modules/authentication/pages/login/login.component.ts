import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/internal/Subject';
import { filter, takeUntil } from 'rxjs/operators';

import { LoginProvider } from '@core/models';
import { NotificationService } from '@shared/services';
import * as fromAuth from '@shared/store/reducers';
import { Login } from '@shared/store/actions/auth.actions';
import { NotificationType } from '@shared/components/notification/notification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private unsubscribe$ = new Subject();
  readonly LoginProvider = LoginProvider;

  constructor(
    private store: Store<fromAuth.State>,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.store
      .select(fromAuth.selectLoggedInError)
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((message) => !!message)
      )
      .subscribe((message) => {
        this.notification.showNotification(NotificationType.error, message);
      });
  }

  login = (provider: LoginProvider): void => {
    this.store.dispatch(Login({ provider }));
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
