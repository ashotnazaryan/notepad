import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

import { APP_CONFIGS } from '@core/config';
import { ROUTES, languages } from '@shared/constants';
import { SetModulePage } from '@shared/store/actions/module-page.actions';
import * as fromRoot from '@shared/store/reducers';
import * as fromTools from '@modules/tools/store/reducers';
import { Language, ModulePage } from '@shared/models';
import { getModulePage } from '@shared/utils';
import { SetLanguage } from '@shared/store/actions/language.actions';
import { ButtonSize } from '@shared/components/button/button.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  notesLink = `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.notes.route}`;
  timeLink = `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.time.route}`;
  groceryLink = `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.grocery.route}`;
  groceryNotificationsLink = `${ROUTES.notifications.route}/${ROUTES.notifications.sub_routes.grocery.route}`;
  languages = languages;
  defaultLanguageKey = APP_CONFIGS.DEFAULT_LANGUAGE_KEY;
  modulePage$: Observable<ModulePage> = this.store.select(fromRoot.selectModulePage); // TODO use takeuntil
  currentLanguage$: Observable<Language> = this.store.select(fromRoot.selectLanguage); // TODO use takeuntil
  clockFormat = 'h:mm A';
  pageTitleKey: string = '';
  notificationsCount$: Observable<number> = this.store.select(fromTools.selectSelectedGroceryList)
    .pipe(map((selectedGroceryList) => selectedGroceryList.length))

  readonly ButtonSize = ButtonSize;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private store: Store<fromRoot.State & fromTools.State>,
    private translate: TranslateService
  ) {
    moment.locale(this.defaultLanguageKey);
  }

  ngOnInit(): void {
    this.handleRouting();

    this.translate.onLangChange.subscribe((data) => {
      this.titleService.setTitle(data.translations[this.pageTitleKey]);
    });
  }

  changeLanguage = (language: Language): void => {
    moment.locale(language.key);
    this.translate.use(language.key);
    this.store.dispatch(SetLanguage(language));
  }

  private handleRouting = (): void => {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap((route) => {
          const modulePage = getModulePage(route);

          this.store.dispatch(SetModulePage(modulePage));
        }),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }

          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.pageTitleKey = data.title;

        this.translate.get(data.title).subscribe((title: string) => {
          this.titleService.setTitle(title);
        });
      });
  }

}
