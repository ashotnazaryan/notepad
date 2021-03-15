export interface GoogleUser {
  name?: string | null;
  email?: string | null;
  photo?: string | null;
}

export interface User<T> {
  [key: string]: T;
}

export enum LoginProvider {
  GOOGLE
}
