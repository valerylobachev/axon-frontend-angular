import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@app/shared';

import { OrgStructureRoutingModule } from './org-structure-routing.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { OrgStructureComponent } from './org-structure.component';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader'

@NgModule({
  imports: [
    SharedModule,
    OrgStructureRoutingModule,

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
    OrgStructureComponent],
  providers: []
})
export class OrgStructureModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: `${environment.i18nPrefix}/assets/i18n/`, suffix: '.json'},
    {prefix: `${environment.i18nPrefix}/assets/i18n/org-structure/`, suffix: '.json'},
  ]);
}
