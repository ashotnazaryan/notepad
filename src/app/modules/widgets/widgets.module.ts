import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { WidgetsRoutingModule } from './widgets.routing.module';
import { WidgetsComponent } from './widgets.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { TimeComponent } from './pages/time/time.component';

@NgModule({
  declarations: [WidgetsComponent, TimeComponent, WeatherComponent],
  imports: [CommonModule, SharedModule, WidgetsRoutingModule]
})
export class WidgetsModule {}
