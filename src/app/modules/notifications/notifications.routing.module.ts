import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '@shared/constants';
import { NotificationsComponent } from './notifications.component';
import { GroceryNotificationsComponent } from './pages/grocery-notifications/grocery-notifications.component';
import { NotesNotificationsComponent } from './pages/notes-notifications/notes-notifications.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationsComponent,
    children: [
      {
        path: '',
        redirectTo: `${ROUTES.admin.sub_routes?.notifications.sub_routes?.grocery.route}`,
        pathMatch: 'full'
      },
      {
        path: `${ROUTES.admin.sub_routes?.notifications.sub_routes?.grocery.route}`,
        component: GroceryNotificationsComponent,
        data: {
          title: `${ROUTES.admin.sub_routes?.notifications.sub_routes?.grocery.langKey}`
        }
      },
      {
        path: `${ROUTES.admin.sub_routes?.notifications.sub_routes?.notes.route}`,
        component: NotesNotificationsComponent,
        data: {
          title: `${ROUTES.admin.sub_routes?.notifications.sub_routes?.notes.langKey}`
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
