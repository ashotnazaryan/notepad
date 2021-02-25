import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/internal/Observable';

import { ClientLocation, Position } from '@shared/models';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(
    private translate: TranslateService
  ) {

  }

  getLocation = (): Observable<ClientLocation> => {
    return new Observable((subscriber) => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            subscriber.next(this.getPosition(position));
            subscriber.complete();
          },
          (error) => subscriber.error(this.getError(error))
        );
      } else {
        subscriber.error(this.translate.instant('GENERAL_UNSUPPORTED_BROWSER'));
      }
    });
  }

  private getPosition = (position: GeolocationPosition): Position => {
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
  }

  private getError = (error: GeolocationPositionError): string => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return this.translate.instant('WEATHER_USER_DENIED_GEOLOCATION');
      case error.POSITION_UNAVAILABLE:
        return this.translate.instant('WEATHER_UNAVAILABLE_INFORMATION');
      case error.TIMEOUT:
        return this.translate.instant('WEATHER_TIMEOUT_ERROR');
      default:
        return this.translate.instant('GENERAL_UNKNOWN_ERROR');
    }
  }
}
