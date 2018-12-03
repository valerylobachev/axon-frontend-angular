import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';

import {SharedModule} from '@app/shared/index'

import { BpmConfigRoutingModule } from './bpm-config-routing.module';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'
import { ConfigComponent } from './config/config.component';
import { SchemasComponent } from './schemas/schemas.component';
import { HomeComponent } from './home/home.component';
import {BpmSharedModule} from '@app/bpm/shared/bpm-shared.module';
import { SchemaComponent } from './schema/schema.component'
import {BpmnEditComponent} from '@app/bpm/config/schema/bpmn-view/bpmn-edit.component'
import {EntityDefinitionService} from 'ngrx-data'
import {DEFAULT_LANGUAGE} from '@app/shared/languages'
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader'

@NgModule({
  imports: [
    SharedModule,
    BpmConfigRoutingModule,
    BpmSharedModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [
      ConfigComponent,
      SchemasComponent,
      HomeComponent,
      SchemaComponent,
      BpmnEditComponent
  ]
})
export class BpmConfigModule {
  constructor(translate: TranslateService) {
    translate.use(DEFAULT_LANGUAGE)
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: `${environment.i18nPrefix}/assets/i18n/`, suffix: '.json'},
    {prefix: `${environment.i18nPrefix}/assets/i18n/bpm/`, suffix: '.json'},
  ]);
}
