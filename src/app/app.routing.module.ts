import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@core/constants';
import { AuthGuard } from '@core/guards/auth.guard';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: `${ROUTES.admin.route}`,
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
    path: `${ROUTES.admin.route}`,
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('@modules/admin/admin.module').then((m) => m.AdminModule)
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
