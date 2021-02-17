import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '@shared/constants';
import { NotificationsComponent } from './notifications.component';
import { GroceryNotificationsComponent } from './pages/grocery-notifications/grocery-notifications.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
    children: [
      {
        path: '',
        redirectTo: `${ROUTES.notifications.sub_routes.grocery.route}`,
        pathMatch: 'full'
      },
      {
        path: `${ROUTES.notifications.sub_routes.grocery.route}`,
        component: GroceryNotificationsComponent,
        data: { 
          title: `${ROUTES.notifications.sub_routes.grocery.langKey}`
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }