import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/internal/Subject';

import { LoginProvider } from '@core/models';
import * as fromAuth from '@shared/store/reducers';
import { Login } from '@modules/authentication/store/actions/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private unsubscribe$ = new Subject();
  readonly LoginProvider = LoginProvider;

  constructor(private store: Store<fromAuth.State>) {}

  login = (provider: LoginProvider): void => {
    this.store.dispatch(Login({ provider }));
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
