import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '@core/constants';
import { WidgetsComponent } from './widgets.component';
import { TimeComponent } from './pages/time/time.component';
import { WeatherComponent } from './pages/weather/weather.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetsComponent,
    children: [
      {
        path: '',
        redirectTo: `${ROUTES.widgets.sub_routes.time.route}`,
        pathMatch: 'full'
      },
      {
        path: `${ROUTES.widgets.sub_routes.time.route}`,
        component: TimeComponent,
        data: {
          title: `${ROUTES.widgets.sub_routes.time.langKey}`
        }
      },
      {
        path: `${ROUTES.widgets.sub_routes.weather.route}`,
        component: WeatherComponent,
        data: {
          title: `${ROUTES.widgets.sub_routes.weather.langKey}`
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule {}
