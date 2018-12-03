import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { BpmRoutingModule } from './bpm-routing.module';
import { HttpClient } from '@angular/common/http';
import { BpmComponent } from './bpm/bpm.component';
import { TasksComponent } from './tasks/tasks.component';
import { ProcessesComponent } from './processes/processes.component';
import {SharedModule} from '@app/shared'
import {environment} from '@env/environment'

@NgModule({
  imports: [
    SharedModule,
    BpmRoutingModule,

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
    BpmComponent,
    TasksComponent,
    ProcessesComponent
  ],
  providers: []
})
export class BpmModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/bpm/`,
    '.json'
  );
}
