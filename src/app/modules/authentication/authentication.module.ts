import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';
import { LoginEffects } from './store/effects';
import * as fromAuth from './store/reducers';
import { AuthenticationRoutingModule } from './authentication.routing.module';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationComponent } from './authentication.component';

@NgModule({
  declarations: [LoginComponent, AuthenticationComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([LoginEffects])
  ]
})
export class AuthenticationModule {}
