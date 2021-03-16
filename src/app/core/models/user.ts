import firebase from 'firebase/app';

export enum LoginProvider {
  GOOGLE
}

export type GoogleUserDTO = firebase.auth.UserCredential;

type UserDTO<T> = {
  [key in keyof T]?: T[key];
};

export default class User<T> {
  name?: string | null;
  email?: string | null;
  photo?: string | null;
  accessToken?: string | null;

  constructor(dto: UserDTO<T>, provider: LoginProvider) {
    switch (provider) {
      case LoginProvider.GOOGLE:
        this.name = (dto as UserDTO<GoogleUserDTO>)?.user?.displayName;
        this.email = (dto as UserDTO<GoogleUserDTO>)?.user?.email;
        this.photo = (dto as UserDTO<GoogleUserDTO>)?.user?.photoURL;
        this.accessToken = ((dto as UserDTO<GoogleUserDTO>)
          ?.credential as any)?.accessToken;
        break;

      default:
        break;
    }
  }
}
