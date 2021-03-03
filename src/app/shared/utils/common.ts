import { Event, NavigationEnd } from '@angular/router';
import { capitalize, get, identity } from 'lodash';

import { ROUTES } from '@core/constants';
import { ModulePage } from '@shared/models';
import Weather, { ClientWeather, WEATHER_ICONS } from '@shared/models/location';
import { Observable } from 'rxjs/internal/Observable';

export const getModulePage = (event: Event): ModulePage => {
  // FIXME https://github.com/angular/angular/issues/15439
  const normalizedUrls = (event as NavigationEnd).url
    .split('/')
    ?.filter(identity);
  const module = normalizedUrls[0];
  const page = normalizedUrls[1];
  const moduleRoute = get(ROUTES, module) || { langKey: '' };
  const pageRoute = get(ROUTES[module]?.sub_routes, page) || { langKey: '' };

  return {
    module: moduleRoute.langKey,
    page: pageRoute.langKey
  };
};

export const weatherNormalizer = (
  weather: Weather,
  digits = 1
): ClientWeather => ({
  location: weather?.location,
  temperature: `${weather?.temperature?.toFixed(digits)} ℃`,
  description: capitalize(weather?.description),
  icon: `assets/icons/weather/${WEATHER_ICONS[weather.icon]}.svg`,
  feelsLike: `${weather?.feelsLike?.toFixed(digits)} ℃`,
  humidity: `${weather?.humidity} %`,
  wind: `${weather?.wind}`,
  minTemperature: `${weather?.minTemperature?.toFixed(digits)} ℃`,
  maxTemperature: `${weather?.maxTemperature?.toFixed(digits)} ℃`
});

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
