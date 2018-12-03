import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {Router, NavigationEnd, ActivationEnd} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TitleService} from '@app/core';

import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarDirective
} from 'ngx-perfect-scrollbar';
import {selectorSettings, SettingsState} from '@app/settings'
import {MENUITEMS} from '@app/layout/menu'
import {Menu} from '@app/layout/menu/menu.model'

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html'
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`
  );
  url: string;
  sidePanelOpened;
  options = {
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr'
  };

  @ViewChild('sidemenu')
  sidemenu;
  @ViewChild(PerfectScrollbarDirective)
  directiveScroll: PerfectScrollbarDirective;

  public config: PerfectScrollbarConfigInterface = {};

  menuItems: Menu[] = MENUITEMS;

  settings: SettingsState;

  constructor(
    private _element: ElementRef,
    private router: Router,
    zone: NgZone,
    private store: Store<any>,
    private titleService: TitleService
  ) {

    this.mediaMatcher.addListener(mql =>
      zone.run(() => {
        this.mediaMatcher = mql;
      })
    );
  }


  private static trackPageView(event: NavigationEnd) {
    // TODO: add Google analytics
    /*  (<any>window).ga('set', 'page', event.urlAfterRedirects);
      (<any>window).ga('send', 'pageview');*/
  }


  ngOnInit(): void {
    this.subscribeToSettings();
    this.subscribeToRouterEvents();
    this.url = this.router.url;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToSettings() {
    this.store
        .pipe(select(selectorSettings), takeUntil(this.unsubscribe$))
        .subscribe(settings => {
          this.settings = settings;
        });
  }

  private subscribeToRouterEvents() {
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.titleService.setTitle(event.snapshot);
      }

      if (event instanceof NavigationEnd) {
        AppLayoutComponent.trackPageView(event);
        document.querySelector(
            '.app-inner > .mat-drawer-content > div'
        ).scrollTop = 0;
        this.url = event.url;
        this.runOnRouteChange();
      }
    });
  }


  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }

    this.updatePS();
  }


  isOver(): boolean {
    if (
      this.url === '/some_fulscreen_page'
    ) {
      return true;
    } else {
      return this.mediaMatcher.matches;
    }
  }

  menuMouseOver(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void {
    if (!this.mediaMatcher.matches && !this.options.compact) {
      setTimeout(() => {
        this.directiveScroll.update();
      }, 350);
    }
  }
}
