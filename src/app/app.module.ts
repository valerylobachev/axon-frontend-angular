import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import {
  MenuComponent,
  HeaderComponent,
  AppLayoutComponent,
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './layout';

import { AppComponent } from './app.component';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { AppRoutingModule } from '@app/app-routing.module';
import { SettingsModule } from '@app/settings';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    AppLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,
    LoadingBarRouterModule,
    SettingsModule,

    // app
    AppRoutingModule,

    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
