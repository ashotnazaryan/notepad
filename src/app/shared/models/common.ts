export interface KeyName {
  key: string;
  name: string;
}

export interface Language {
  key: string;
  shortName: string;
  name: string;
}

export enum ClockSize {
  small,
  large
}

export enum CacheKey {
  USER = 'user'
}

export enum ButtonSize {
  icon,
  small,
  large
}
