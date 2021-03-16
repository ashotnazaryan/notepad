import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '@core/constants';
import { WidgetsComponent } from './widgets.component';
import { TimeComponent } from './pages/time/time.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { GameComponent } from './pages/game/game.component';

const routes: Routes = [
  {
    path: '',
    component: WidgetsComponent,
    children: [
      {
        path: '',
        redirectTo: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.time.route}`,
        pathMatch: 'full'
      },
      {
        path: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.time.route}`,
        component: TimeComponent,
        data: {
          title: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.time.langKey}`
        }
      },
      {
        path: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.weather.route}`,
        component: WeatherComponent,
        data: {
          title: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.weather.langKey}`
        }
      },
      {
        path: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.game.route}`,
        component: GameComponent,
        data: {
          title: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.game.langKey}`
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
