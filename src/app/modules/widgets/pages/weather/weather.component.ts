import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { finalize, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { APP_CONFIGS } from '@core/config';
import { HttpService } from '@core/services/http.service';
import { LocationService, NotificationService } from '@shared/services';
import { ClientLocation, Language } from '@shared/models';
import Weather, {
  ClientWeather,
  ForecastDTO,
  WeatherDTO
} from '@shared/models/location';
import { weatherNormalizer } from '@shared/utils';
import * as fromRoot from '@shared/store/reducers';
import { NotificationType } from '@shared/components/notification/notification.component';
import { WeatherViewMode } from '@shared/components/weather-widget/weather-widget.component';
import { zip } from 'rxjs/internal/observable/zip';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  loading$ = new BehaviorSubject<boolean>(false);
  weather: ClientWeather = {};
  forecastHours = 40;
  readonly WeatherViewMode = WeatherViewMode;

  constructor(
    private http: HttpService,
    private location: LocationService,
    private store: Store<fromRoot.State>,
    private translate: TranslateService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.getWeather();

    this.translate.onLangChange.subscribe(() => this.getWeather());
  }

  getWeather = (): void => {
    this.loading$.next(true);

    this.location
      .getLocation()
      .pipe(
        takeUntil(this.unsubscribe$),
        withLatestFrom(this.store.select(fromRoot.selectLanguage)),
        switchMap(([data, { key }]: [ClientLocation, Language]) => {
          const url = `${APP_CONFIGS.WEATHER_API.baseUrl}/data/2.5/weather?lang=${key}&lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=${APP_CONFIGS.WEATHER_API.key}`;
          const hourlyForecastUrl = `${APP_CONFIGS.WEATHER_API.baseUrl}/data/2.5/forecast?lang=${key}&lat=${data.latitude}&lon=${data.longitude}&units=metric&cnt=${this.forecastHours}&appid=${APP_CONFIGS.WEATHER_API.key}`;

          return zip(
            this.http.get<WeatherDTO>(url),
            this.http.get<ForecastDTO>(hourlyForecastUrl)
          );
        }),
        finalize(() => this.loading$.next(false))
      )
      .subscribe(this.handleSuccess, this.handleError);
  };

  private handleSuccess = ([weather, forecast]: [
    WeatherDTO,
    ForecastDTO
  ]): void => {
    const normalizedCurrentWeather = weatherNormalizer(new Weather(weather));
    const normalizedForecast = forecast.list
      .map((item) => weatherNormalizer(new Weather(item)))
      // NOTE to get daily forecast, openweathermap provides a 3-hour forecast for free
      .filter((item, index) => index !== 0 && index % 8 === 0);

    this.weather = {
      ...normalizedCurrentWeather,
      forecast: normalizedForecast
    };
  };

  private handleError = ({ message }: { message: string }): void => {
    this.notification.showNotification(NotificationType.error, message);
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
