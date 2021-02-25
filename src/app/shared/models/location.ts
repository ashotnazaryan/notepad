export interface Position {
  latitude: number;
  longitude: number;
}

export type ClientLocation = Position | string;

export interface WeatherDTO {
  name: string;
  weather: Array<{ description: string }>;
  main: {
    feels_like: number;
    humidity: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  wind: {
    speed: number;
  }
}

export interface ClientWeather {
  location?: string;
  description?: string;
  temperature?: string;
  feelsLike?: string;
  humidity?: string;
  wind?: string;
  minTemperature?: string;
  maxTemperature?: string;
}

export default class Weather {
  location?: string;
  description?: string;
  temperature?: number;
  feelsLike?: number;
  humidity?: number;
  wind?: number;
  minTemperature?: number;
  maxTemperature?: number;

  constructor(dto: WeatherDTO) {
    this.location = dto.name;
    this.description = dto.weather[0].description;
    this.temperature = dto.main.temp;
    this.feelsLike = dto.main.feels_like;
    this.humidity = dto.main.humidity;
    this.wind = dto.wind.speed;
    this.minTemperature = dto.main.temp_min;
    this.maxTemperature = dto.main.temp_max;
  }
}