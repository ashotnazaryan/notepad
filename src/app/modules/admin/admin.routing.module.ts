import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '@core/constants';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: `${ROUTES.admin.sub_routes?.tools.route}`,
        pathMatch: 'full'
      },
      {
        path: `${ROUTES.admin.sub_routes?.tools.route}`,
        loadChildren: () =>
          import('@modules/tools/tools.module').then((m) => m.ToolsModule)
      },
      {
        path: `${ROUTES.admin.sub_routes?.widgets.route}`,
        loadChildren: () =>
          import('@modules/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: `${ROUTES.admin.sub_routes?.notifications.route}`,
        loadChildren: () =>
          import('@modules/notifications/notifications.module').then(
            (m) => m.NotificationsModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
