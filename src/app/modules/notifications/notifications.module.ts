import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared/shared.module';
import { NotificationsRoutingModule } from './notifications.routing.module';
import { NotificationsComponent } from './notifications.component';
import { GroceryNotificationsComponent } from './pages/grocery-notifications/grocery-notifications.component';

@NgModule({
  declarations: [
    NotificationsComponent,
    GroceryNotificationsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
