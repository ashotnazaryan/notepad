import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '@core/constants';
import { ToolsComponent } from './tools.component';
import { NotesComponent } from './pages/notes/notes.component';
import { TimeComponent } from './pages/time/time.component';
import { GroceryComponent } from './pages/grocery/grocery.component';
import { WeatherComponent } from './pages/weather/weather.component';

const routes: Routes = [
  {
    path: '',
    component: ToolsComponent,
    children: [
      {
        path: '',
        redirectTo: `${ROUTES.tools.sub_routes.notes.route}`,
        pathMatch: 'full'
      },
      {
        path: `${ROUTES.tools.sub_routes.notes.route}`,
        component: NotesComponent,
        data: { 
          title: `${ROUTES.tools.sub_routes.notes.langKey}`
        }
      },
      {
        path: `${ROUTES.tools.sub_routes.time.route}`,
        component: TimeComponent,
        data: { 
          title: `${ROUTES.tools.sub_routes.time.langKey}`
        }
      },
      {
        path: `${ROUTES.tools.sub_routes.grocery.route}`,
        component: GroceryComponent,
        data: { 
          title: `${ROUTES.tools.sub_routes.grocery.langKey}`
        }
      },
      {
        path: `${ROUTES.tools.sub_routes.weather.route}`,
        component: WeatherComponent,
        data: { 
          title: `${ROUTES.tools.sub_routes.weather.langKey}`
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }