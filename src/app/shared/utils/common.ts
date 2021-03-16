import { Event, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { capitalize, get, identity } from 'lodash';
import * as moment from 'moment';

import { ROUTES } from '@core/constants';
import { ModulePage } from '@core/models';
import Weather, { ClientWeather, WEATHER_ICONS } from '@shared/models/location';

export const getModulePage = (event: Event): ModulePage => {
  const normalizedUrls = (event as NavigationEnd).urlAfterRedirects
    .split('/')
    ?.filter(identity);
  const module = normalizedUrls[0];
  const page = normalizedUrls[1];
  const moduleRoute = get(ROUTES.admin.sub_routes, module);
  const pageRoute = get(moduleRoute?.sub_routes, page);

  return {
    module: moduleRoute?.langKey || '',
    page: pageRoute?.langKey || ''
  };
};

export const weatherNormalizer = (weather: Weather): ClientWeather => ({
  location: weather?.location,
  temperature: getRoundedTemperature(weather.temperature),
  description: capitalize(weather?.description),
  icon: `assets/icons/weather/animated/${WEATHER_ICONS[weather.icon]}.svg`,
  feelsLike: getRoundedTemperature(weather.feelsLike),
  humidity: `${weather?.humidity} %`,
  wind: `${Math.round(weather?.wind)}`,
  minTemperature: getRoundedTemperature(weather.minTemperature),
  maxTemperature: getRoundedTemperature(weather.maxTemperature),
  precipitationProbability: getPrecipitationProbability(
    weather.precipitationProbability
  ),
  dateTime: {
    date: `${moment(weather?.dateTime?.date).format('D MMMM')}`,
    time: `${moment(weather?.dateTime?.time).format('h:mm A')}`
  }
});

const getRoundedTemperature = (temperature: number): string => {
  return temperature >= -0.5 && temperature < 0
    ? `0 ℃`
    : `${Math.round(temperature)} ℃`;
};

const getPrecipitationProbability = (
  precipitationProbability: number | undefined
): string => {
  if (typeof precipitationProbability === 'undefined') {
    return '';
  }

  return `${Math.round(precipitationProbability * 100)} %`;
};

export const loadImage = (path = ''): Observable<HTMLImageElement | string> => {
  return new Observable((observer) => {
    const img = new Image();

    img.src = path;

    img.onload = () => {
      observer.next(img);
      observer.complete();
    };

    img.onerror = (err) => {
      observer.error(err);
    };
  });
};
