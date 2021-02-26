import { Component, Input } from '@angular/core';

import { ClientWeather } from '@shared/models/location';

export enum WeatherViewMode {
  full,
  compact
}

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss']
})
export class WeatherWidgetComponent {
  @Input() data: ClientWeather = {};
  @Input() viewMode: WeatherViewMode = WeatherViewMode.full;

  viewModes = WeatherViewMode;
}
