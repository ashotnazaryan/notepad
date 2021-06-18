import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '@environments/environment';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { ROOT_REDUCERS, metaReducers } from '@shared/store/reducers';
import { ToolsEffects } from '@shared/store/effects';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        // strictActionWithinNgZone: true, // TODO fix, when true, issue rised 'Action is running outside NgZone'
        strictActionTypeUniqueness: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true
    }),
    EffectsModule.forRoot([ToolsEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
