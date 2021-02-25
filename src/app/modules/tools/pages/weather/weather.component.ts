import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { finalize, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { APP_CONFIGS } from '@core/config';
import { HttpService } from '@core/services/http.service';
import { LocationService } from '@shared/services/location.service';
import { ClientLocation, Language, Weather } from '@shared/models';
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
  weather?: Weather;

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
        finalize(() => this.loading$.next(false))
      )
      .subscribe(this.handleSuccess, this.handleError);
  }

  private handleSuccess = ([data, { key }]: [ClientLocation | any, Language]): void => {
    // TODO check why type alias ClientLocation isn't working
    const url = `${APP_CONFIGS.WEATHER_API.baseUrl}/data/2.5/weather?lang=${key}&lat=${data.latitude}&lon=${data.longitude}&units=metric&appid=${APP_CONFIGS.WEATHER_API.key}`;

    this.http.get(url)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((weather) => {
        this.weather = weatherNormalizer(weather);
      });
  }

  private handleError = (error: string): void => {
    const options: NotificationOptions = {
      data: {
        type: NotificationType.error,
        message: error
      }
    };

    this.snackBar.openFromComponent(NotificationComponent, options);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
