import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';

import { APP_CONFIGS } from './config';
import { SharedModule } from '@shared/shared.module';
import * as fromTools from '@modules/tools/store/reducers';
import { HeaderComponent } from './components/header/header.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function appInitializerFactory(translate: TranslateService) {
  return () => {
    translate.setDefaultLang(APP_CONFIGS.DEFAULT_LANGUAGE_KEY);
    return translate.use(APP_CONFIGS.DEFAULT_LANGUAGE_KEY).toPromise();
  };
}

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    StoreModule.forFeature(fromTools.toolsFeatureKey, fromTools.reducers)
  ],
  exports: [HttpClientModule, SharedModule, HeaderComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    }
  ]
})
export class CoreModule {}
