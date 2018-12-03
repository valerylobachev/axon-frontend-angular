import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '@app/shared';

import { ProjectsRoutingModule } from './projects-routing.module';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader'

@NgModule({
  imports: [
    SharedModule,
    ProjectsRoutingModule,

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
    ProjectsComponent,
    ProjectDashboardComponent
  ],
  providers: []
})
export class ProjectsModule {
  constructor() {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: `${environment.i18nPrefix}/assets/i18n/`, suffix: '.json'},
    {prefix: `${environment.i18nPrefix}/assets/i18n/projects/`, suffix: '.json'},
  ]);
}
