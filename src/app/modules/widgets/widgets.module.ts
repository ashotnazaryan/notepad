import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { WidgetsRoutingModule } from './widgets.routing.module';
import { WidgetsComponent } from './widgets.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { TimeComponent } from './pages/time/time.component';
import { GameComponent } from './pages/game/game.component';

@NgModule({
  declarations: [
    WidgetsComponent,
    TimeComponent,
    WeatherComponent,
    GameComponent
  ],
  imports: [CommonModule, SharedModule, WidgetsRoutingModule]
})
export class WidgetsModule {}
