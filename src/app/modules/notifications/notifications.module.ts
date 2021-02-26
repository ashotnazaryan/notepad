import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared/shared.module';
import { NotificationsRoutingModule } from './notifications.routing.module';
import { NotificationsComponent } from './notifications.component';
import { GroceryNotificationsComponent } from './pages/grocery-notifications/grocery-notifications.component';
import { NotesNotificationsComponent } from './pages/notes-notifications/notes-notifications.component';

@NgModule({
  declarations: [
    NotificationsComponent,
    GroceryNotificationsComponent,
    NotesNotificationsComponent
  ],
  imports: [
    NotificationsRoutingModule,
    CommonModule,
    TranslateModule,
    SharedModule
  ]
})
export class NotificationsModule { }
