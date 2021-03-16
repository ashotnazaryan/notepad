import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from '@core/components/header/header.component';

@NgModule({
  declarations: [AdminComponent, HeaderComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule]
})
export class AdminModule {}
