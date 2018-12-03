import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@app/shared';

import { ConfigRoutingModule } from './config-routing.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ConfigComponent } from './config.component';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader'

@NgModule({
  imports: [
    SharedModule,
    ConfigRoutingModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
  ],
  declarations: [
  ConfigComponent],
  providers: []
})
export class ConfigModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: `${environment.i18nPrefix}/assets/i18n/`, suffix: '.json'},
    {prefix: `${environment.i18nPrefix}/assets/i18n/config/`, suffix: '.json'},
  ]);
}
