import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@core/constants';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: `${ROUTES.tools.route}`,
    pathMatch: 'full'
  },
  {
    path: `${ROUTES.authentication.route}`,
    loadChildren: () =>
      import('@modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      )
  },
  {
    path: `${ROUTES.tools.route}`,
    loadChildren: () =>
      import('@modules/tools/tools.module').then((m) => m.ToolsModule)
  },
  {
    path: `${ROUTES.widgets.route}`,
    loadChildren: () =>
      import('@modules/widgets/widgets.module').then((m) => m.WidgetsModule)
  },
  {
    path: `${ROUTES.notifications.route}`,
    loadChildren: () =>
      import('@modules/notifications/notifications.module').then(
        (m) => m.NotificationsModule
      )
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
