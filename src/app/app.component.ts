import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

import { APP_CONFIGS } from '@core/config';
import { ROUTES, languages } from '@shared/constants';
import { SetModulePage } from '@shared/store/actions/module-page.actions';
import * as fromRoot from '@shared/store/reducers';
import { Language, ModulePage } from '@shared/models';
import { getModulePage } from '@shared/utils';
import { SetLanguage } from '@shared/store/actions/language.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  notesLink = `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.notes.route}`;
  timeLink = `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.time.route}`;
  languages = languages;
  defaultLanguageKey = APP_CONFIGS.DEFAULT_LANGUAGE_KEY;
  modulePage$: Observable<ModulePage> = this.store.select(fromRoot.selectModulePage);
  currentLanguage$: Observable<Language> = this.store.select(fromRoot.selectLanguage);
  clockFormat = 'hh:mm A';

  constructor(
    private router: Router,
    private store: Store<fromRoot.State>,
    private translate: TranslateService
  ) {
    moment.locale(this.defaultLanguageKey);

    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event) => {
        const modulePage = getModulePage(event);

        this.store.dispatch(SetModulePage(modulePage));
      });
  }

  ngOnInit(): void {
    
  }

  changeLanguage = (language: Language): void => {
    moment.locale(language.key);
    this.translate.use(language.key);
    this.store.dispatch(SetLanguage(language));
  }

}
