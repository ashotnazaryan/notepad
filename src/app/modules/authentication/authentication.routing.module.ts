import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '@shared/constants';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        redirectTo: `${ROUTES.authentication.sub_routes?.login.route}`,
        pathMatch: 'full'
      },
      {
        path: `${ROUTES.authentication.sub_routes?.login.route}`,
        component: LoginComponent,
        data: {
          title: `${ROUTES.authentication.sub_routes?.login.langKey}`
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
