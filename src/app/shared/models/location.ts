export interface Position {
  latitude: number;
  longitude: number;
}

export interface Weather {
  location?: string;
  temperature?: string;
  description?: string;
  minTemperature?: string;
  maxTemperature?: string;
  feelsLike?: string;
  humidity?: string;
}

export type ClientLocation = Position | string;