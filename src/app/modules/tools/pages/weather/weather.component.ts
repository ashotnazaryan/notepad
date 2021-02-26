import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { finalize, switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { APP_CONFIGS } from '@core/config';
import { HttpService } from '@core/services/http.service';
import { LocationService } from '@shared/services/location.service';
import { ClientLocation, Language } from '@shared/models';
import Weather, { ClientWeather, WeatherDTO } from '@shared/models/location';
import { weatherNormalizer } from '@shared/utils';
import * as fromRoot from '@shared/store/reducers';
import { NotificationComponent, NotificationOptions, NotificationType } from '@shared/components/notification/notification.component';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  loading$ = new BehaviorSubject<boolean>(false);
  weather: ClientWeather = {};

  constructor(
    private http: HttpService,
    private location: LocationService,
    private snackBar: MatSnackBar,
    private store: Store<fromRoot.State>,
    private translate: TranslateService
  ) {

  }

  ngOnInit(): void {
    this.getWeather();

    this.translate.onLangChange.subscribe(() => this.getWeather());
  }

  getWeather = (): void => {
    this.loading$.next(true);

    this.location.getLocation()
      .pipe(
        takeUntil(this.unsubscribe$),
        withLatestFrom(this.store.select(fromRoot.selectLanguage)),
        switchMap(([data, { key }]: [ClientLocation, Language]) => {
          const url = `${APP_CONFIGS.WEATHER_API.baseUrl}/data/2.5/weather?lang=${key}&lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=${APP_CONFIGS.WEATHER_API.key}`;

          return this.http.get(url)
        }),
        finalize(() => this.loading$.next(false))
      )
      .subscribe(this.handleSuccess, this.handleError);
  }

  private handleSuccess = (weather: WeatherDTO): void => {
    this.weather = weatherNormalizer(new Weather(weather), 0);
  }

  private handleError = ({message}: { message: string }): void => {
    const options: NotificationOptions = {
      data: {
        message,
        type: NotificationType.error
      }
    };

    this.snackBar.openFromComponent(NotificationComponent, options);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
