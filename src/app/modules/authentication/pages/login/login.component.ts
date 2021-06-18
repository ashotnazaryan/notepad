import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/internal/Subject';
import { filter, takeUntil } from 'rxjs/operators';

import { LoginProvider } from '@shared/models';
import { NotificationService } from '@shared/services';
import { ButtonSize } from '@shared/components/button/button.component';
import * as fromAuth from '@shared/store/reducers';
import { AuthActions } from '@shared/store/actions';
import { selectLoggedInError } from '@shared/store/selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private unsubscribe$ = new Subject();
  readonly LoginProvider = LoginProvider;
  readonly ButtonSize = ButtonSize;

  constructor(
    private store: Store<fromAuth.State>,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectLoggedInError)
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((message) => !!message)
      )
      .subscribe((message) => {
        this.notification.showNotification(message);
      });
  }

  login = (provider: LoginProvider): void => {
    this.store.dispatch(AuthActions.Login({ provider }));
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
