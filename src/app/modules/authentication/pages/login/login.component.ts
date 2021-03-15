import { Component } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

import { LoginProvider } from '@core/models';
import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private unsubscribe$ = new Subject();
  readonly LoginProvider = LoginProvider;

  constructor(private authentication: AuthenticationService) {}

  login = (provider: LoginProvider): void => {
    this.authentication
      .login(provider)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user) => {
        const userStr = JSON.stringify(user);

        localStorage.setItem('user', userStr);
      });
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
