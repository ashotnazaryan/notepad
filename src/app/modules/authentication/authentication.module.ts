import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';
import * as fromAuth from './store/reducers';
import { LoginEffects } from './store/effects';
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
