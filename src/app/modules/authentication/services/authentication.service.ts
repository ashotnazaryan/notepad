import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

import User, { GoogleUserDTO, LoginProvider } from '@core/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  get loggedIn(): boolean {
    const user: User<GoogleUserDTO> = JSON.parse(
      localStorage.getItem('user') || '{}'
    );

    return !!user?.accessToken;
  }

  get user(): User<GoogleUserDTO> {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  login = (provider: LoginProvider): Observable<User<GoogleUserDTO>> => {
    const authProvider = this.getProvider(provider);
    const firebase$ = from(firebase.auth().signInWithPopup(authProvider));

    return firebase$.pipe(
      map((data) => new User<GoogleUserDTO>(data, provider)),
      catchError((error) => of(error))
    );
  };

  logout = (): Observable<void> => {
    const firebase$ = from(firebase.auth().signOut());

    return firebase$.pipe(catchError((error) => of(error)));
  };

  private getProvider = (provider: LoginProvider) => {
    switch (provider) {
      case LoginProvider.GOOGLE:
        return new firebase.auth.GoogleAuthProvider();

      default:
        return new firebase.auth.GoogleAuthProvider();
    }
  };
}
