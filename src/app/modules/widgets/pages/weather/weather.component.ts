import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  finalize,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

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
import {
  HideLoading,
  ShowLoading
} from '@shared/store/actions/loading.actions';
import { WeatherService } from './services/weather.service';
import { selectLanguage, selectLoading } from '@shared/store/selectors';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  forecastHours = 40;
  weather?: ClientWeather;

  loading$: Observable<boolean> = this.store
    .select(selectLoading)
    .pipe(takeUntil(this.unsubscribe$));

  readonly WeatherViewMode = WeatherViewMode;

  constructor(
    private location: LocationService,
    private store: Store<fromRoot.State>,
    private translate: TranslateService,
    private notification: NotificationService,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    this.getWeather();
    this.translate.onLangChange.subscribe(() => this.getWeather());
  }

  getWeather = (): void => {
    this.location
      .getLocation()
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(() => this.store.dispatch(ShowLoading())),
        withLatestFrom(this.store.select(selectLanguage)),
        switchMap(([data, { key }]: [ClientLocation, Language]) =>
          this.weatherService.getWeather(data, key, this.forecastHours)
        ),
        finalize(() => this.store.dispatch(HideLoading()))
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
    this.notification.showNotification(message);
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
