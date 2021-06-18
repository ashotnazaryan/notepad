import firebase from 'firebase/app';

export enum LoginProvider {
  GOOGLE = 1,
  FACEBOOK = 2
}

export type UserDTO = firebase.auth.UserCredential;

export default class User {
  name?: string | null;
  email?: string | null;
  photo?: string | null;
  accessToken?: string | null;

  constructor(dto: UserDTO) {
    this.name = dto.user?.displayName;
    this.email = dto.user?.email;
    this.photo = dto.user?.photoURL;
    this.accessToken = (dto?.credential as any)?.accessToken;
  }
}
