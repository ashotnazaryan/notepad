import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { AuthenticationRoutingModule } from './authentication.routing.module';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
  declarations: [LoginComponent, AuthenticationComponent],
  imports: [CommonModule, SharedModule, AuthenticationRoutingModule]
})
export class AuthenticationModule {}
