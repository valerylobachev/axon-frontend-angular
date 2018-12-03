import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

import {
  ActionSettingsChangeAnimationsPageDisabled,
  ActionSettingsChangeLanguage,
  ActionSettingsPersist, selectorSettings, SettingsState
} from '@app/settings'
import {select, Store} from '@ngrx/store'
import {AnimationsService, AuthService, selectorAuth, TitleService} from '@app/core'
import {TranslateService} from '@ngx-translate/core'
import {takeUntil} from 'rxjs/operators'
import {Subject} from 'rxjs'
import browser from 'browser-detect'
import {DEFAULT_LANGUAGE, LANGUAGES} from '@app/shared/languages'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{

  private unsubscribe$: Subject<void> = new Subject<void>();

  @Output()
  toggleSidenav = new EventEmitter<void>();
  @Output()

  kcProfile: Keycloak.KeycloakProfile
  isAuthenticated: boolean;

  languages = LANGUAGES;

  settings: SettingsState;


  constructor(
      private store: Store<any>,
      private titleService: TitleService,
      private animationService: AnimationsService,
      private translate: TranslateService,
      private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);;
    this.subscribeToAuth();
    this.subscribeToSettings();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  private subscribeToAuth() {
    this.store
        .pipe(select(selectorAuth), takeUntil(this.unsubscribe$))
        .subscribe(auth => {
          console.log(auth)
          this.isAuthenticated = auth.isAuthenticated
          this.kcProfile = auth.profile
        });
  }

  private static isIEorEdge() {
    return ['ie', 'edge'].includes(browser().name);
  }


  private subscribeToSettings() {
    if (HeaderComponent.isIEorEdge()) {
      this.store.dispatch(
          new ActionSettingsChangeAnimationsPageDisabled({
            pageAnimationsDisabled: true
          })
      );
    }
    this.store
        .pipe(select(selectorSettings), takeUntil(this.unsubscribe$))
        .subscribe(settings => {
          this.settings = settings;
          this.setLanguage(settings);
          this.animationService.updateRouteAnimationType(
              settings.pageAnimations,
              settings.elementsAnimations
          );
        });
  }


  private setLanguage(settings: SettingsState) {
    const { language } = settings;
    if (language) {
      this.translate.use(language);
    }
  }
  onLogoutClick() {
    this.authService.logout()
  }

  onProfileClick() {
    this.authService.profile()
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
    this.store.dispatch(new ActionSettingsPersist({ settings: this.settings }));
  }
}
