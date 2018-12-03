import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@app/shared';

import { AdminRoutingModule } from './admin-routing.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { AdminComponent } from './admin.component';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader'

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,

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
  AdminComponent],
  providers: []
})
export class AdminModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: `${environment.i18nPrefix}/assets/i18n/`, suffix: '.json'},
    {prefix: `${environment.i18nPrefix}/assets/i18n/admin/`, suffix: '.json'},
  ]);
}
