export interface Position {
  latitude: number;
  longitude: number;
}

export type ClientLocation = Position & { message?: string };

export enum WeatherIcon {
  'clear-sky-day' = '01d',
  'clear-sky-night' = '01n',
  'few-clouds-day' = '02d',
  'few-clouds-night' = '02n',
  'scattered-clouds-day' = '03d',
  'scattered-clouds-night' = '03n',
  'broken-clouds-day' = '04d',
  'broken-clouds-night' = '04n',
  'shower-rain-day' = '09d',
  'shower-rain-night' = '09n',
  'rain-day' = '10d',
  'rain-night' = '10n',
  'thunderstorm-day' = '11d',
  'thunderstorm-night' = '11n',
  'snow-day' = '13d',
  'snow-night' = '13n',
  'mist-day' = '50d',
  'mist-night' = '50n'
}

export const WEATHER_ICONS = {
  [WeatherIcon['clear-sky-day']]: 'clear-sky',
  [WeatherIcon['clear-sky-night']]: 'clear-sky',
  [WeatherIcon['few-clouds-day']]: 'cloudy',
  [WeatherIcon['few-clouds-night']]: 'cloudy',
  [WeatherIcon['scattered-clouds-day']]: 'cloudy',
  [WeatherIcon['scattered-clouds-night']]: 'cloudy',
  [WeatherIcon['broken-clouds-day']]: 'cloudy',
  [WeatherIcon['broken-clouds-night']]: 'cloudy',
  [WeatherIcon['shower-rain-day']]: 'shower-rain',
  [WeatherIcon['shower-rain-night']]: 'shower-rain',
  [WeatherIcon['rain-day']]: 'rain',
  [WeatherIcon['rain-night']]: 'rain',
  [WeatherIcon['thunderstorm-day']]: 'thunderstorm',
  [WeatherIcon['thunderstorm-night']]: 'thunderstorm',
  [WeatherIcon['snow-day']]: 'snow',
  [WeatherIcon['snow-night']]: 'snow',
  [WeatherIcon['mist-day']]: 'mist',
  [WeatherIcon['mist-night']]: 'mist',
};

export interface WeatherDTO {
  name: string;
  weather: Array<{
    description: string;
    icon: WeatherIcon;
  }>;
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
  location: string;
  description: string;
  icon: string;
  temperature: string;
  feelsLike: string;
  humidity: string;
  wind: string;
  minTemperature: string;
  maxTemperature: string;
}

export default class Weather {
  location: string;
  description: string;
  icon: WeatherIcon;
  temperature: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  minTemperature: number;
  maxTemperature: number;

  constructor(dto: WeatherDTO) {
    this.location = dto.name;
    this.description = dto.weather[0].description;
    this.icon = dto.weather[0].icon;
    this.temperature = dto.main.temp;
    this.feelsLike = dto.main.feels_like;
    this.humidity = dto.main.humidity;
    this.wind = dto.wind.speed;
    this.minTemperature = dto.main.temp_min;
    this.maxTemperature = dto.main.temp_max;
  }
}