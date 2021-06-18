import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { AdminRoutingModule } from './admin.routing.module';
import { HeaderComponent } from '@shared/components/header/header.component';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent, HeaderComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule]
})
export class AdminModule {}
