import { Injectable } from '@angular/core';
import { zip } from 'rxjs/internal/observable/zip';

import { environment } from '@environments/environment';
import { BaseHttpService } from '@core/services/http.service';
import {
  ClientLocation,
  ForecastDTO,
  Language,
  WeatherDTO
} from '@shared/models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends BaseHttpService {
  getWeather = (
    data: ClientLocation,
    key: Language['key'],
    forecastHours: number
  ): Observable<[WeatherDTO, ForecastDTO]> => {
    const url = `${environment.WEATHER_API.baseUrl}/data/2.5/weather?lang=${key}&lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=${environment.WEATHER_API.key}`;
    const hourlyForecastUrl = `${environment.WEATHER_API.baseUrl}/data/2.5/forecast?lang=${key}&lat=${data.latitude}&lon=${data.longitude}&units=metric&cnt=${forecastHours}&appid=${environment.WEATHER_API.key}`;

    return zip(
      this.http.get<WeatherDTO>(url),
      this.http.get<ForecastDTO>(hourlyForecastUrl)
    );
  };
}
