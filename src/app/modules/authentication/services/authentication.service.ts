import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';
import { map } from 'rxjs/operators';

import { GoogleUser, LoginProvider } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  login = (provider: LoginProvider): Observable<GoogleUser> => {
    const authProvider = this.getProvider(provider);
    const firebase$ = from(firebase.auth().signInWithPopup(authProvider));

    return firebase$.pipe(
      map((data) => ({
        name: data.user?.displayName,
        email: data.user?.email,
        photo: data.user?.photoURL
      }))
    );
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
