import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@app/shared/languages';

@Component({
  selector: 'axon-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(translate: TranslateService) {
    translate.addLangs(LANGUAGES);
    translate.setDefaultLang(DEFAULT_LANGUAGE);

    const browserLang: string = translate.getBrowserLang();
    translate.use(
      browserLang.match(`/${LANGUAGES.join('|')}/`)
        ? browserLang
        : DEFAULT_LANGUAGE
    );
  }
}
