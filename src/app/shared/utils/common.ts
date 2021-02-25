import { Event, NavigationEnd } from '@angular/router';
import { get, identity } from 'lodash';

import { ROUTES } from '@core/constants';
import { ModulePage, Weather } from '@shared/models';

export const getModulePage = (event: Event): ModulePage => {
  // FIXME https://github.com/angular/angular/issues/15439
  const normalizedUrls = (event as NavigationEnd).url.split('/')?.filter(identity);
  const module = normalizedUrls[0];
  const page = normalizedUrls[1];
  const moduleRoute = get(ROUTES, module) || { langKey: '' };
  const pageRoute = get(ROUTES[module]?.sub_routes, page) || { langKey: '' };

  return {
    module: moduleRoute.langKey,
    page: pageRoute.langKey
  };
}

export const weatherNormalizer = (weather: any): Weather => {
  const main = weather?.main;

  return {
    location: weather?.name,
    temperature: `${main?.temp}℃`,
    description: weather?.weather[0]?.description,
    minTemperature: `${main?.temp_min}℃`,
    maxTemperature: `${main?.temp_max}℃`,
    feelsLike: `${main?.feels_like}℃`,
    humidity: `${main?.humidity}%`
  }
}