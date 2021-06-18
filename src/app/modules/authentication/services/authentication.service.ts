import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';

import User, { LoginProvider } from '@shared/models/user';
import { CacheService } from '@shared/services/cache.service';
import { CacheKey } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private cache: CacheService) {}

  get loggedIn(): boolean {
    const user = this.cache.getItem<User>(CacheKey.USER);

    return !!user?.accessToken;
  }

  get user(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  login = (
    provider: LoginProvider
  ): Observable<firebase.auth.UserCredential> => {
    const authProvider = this.getProvider(provider);

    return from(firebase.auth().signInWithPopup(authProvider));
  };

  logout = (): Observable<void> => {
    return from(firebase.auth().signOut());
  };

  private getProvider = (provider: LoginProvider) => {
    switch (provider) {
      case LoginProvider.GOOGLE:
        return new firebase.auth.GoogleAuthProvider();

      case LoginProvider.FACEBOOK:
        return new firebase.auth.FacebookAuthProvider();

      default:
        return new firebase.auth.GoogleAuthProvider();
    }
  };
}
