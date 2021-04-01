import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs/internal/Observable';
import { from } from 'rxjs/internal/observable/from';

import User, { GoogleUserDTO, LoginProvider } from '@core/models/user';
import { CacheService } from '@shared/services/cache.service';
import { CacheKey } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private cache: CacheService) {}

  get loggedIn(): boolean {
    const user = this.cache.getItem<User<GoogleUserDTO>>(CacheKey.USER);

    return !!user?.accessToken;
  }

  get user(): User<GoogleUserDTO> {
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

      default:
        return new firebase.auth.GoogleAuthProvider();
    }
  };
}
