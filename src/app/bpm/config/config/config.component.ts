import { Component, OnDestroy, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ActivationEnd, Router} from '@angular/router';
import {TitleService} from '@app/core/index';
import {TranslateService} from '@ngx-translate/core';
import {selectorSettings, SettingsState} from '@app/settings/index';
import {filter, map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {DEFAULT_LANGUAGE} from '@app/shared/languages';

@Component({
  selector: 'axon-bpm-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
      private store: Store<any>,
      private router: Router,
      private titleService: TitleService,
      private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);

    console.log(this.translate.translations)
    this.subscribeToSettings();
    this.subscribeToRouterEvents();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToSettings() {
    this.store
        .pipe(select(selectorSettings), takeUntil(this.unsubscribe$))
        .subscribe((settings: SettingsState) => {
              console.log(`new lang ${settings.language}`);
              this.translate.use(settings.language)
              this.translate.reloadLang(settings.language)
            }
        );
  }

  private subscribeToRouterEvents() {
    this.titleService.setTitle(
        this.router.routerState.snapshot.root,
        this.translate
    );
    this.router.events
        .pipe(
            filter(event => event instanceof ActivationEnd),
            map((event: ActivationEnd) => event.snapshot),
            takeUntil(this.unsubscribe$)
        )
        .subscribe(snapshot =>
            this.titleService.setTitle(snapshot, this.translate)
        );
  }

}
