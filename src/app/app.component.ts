import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil, filter, map, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { isEmpty } from 'lodash';
import * as moment from 'moment';
import firebase from 'firebase/app';

import { environment } from '@environments/environment';
import { APP_CONFIGS } from '@core/config';
import { getModulePage } from '@shared/utils';
import { SetModulePage } from '@shared/store/actions/module-page.actions';
import * as fromRoot from '@shared/store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private unsubscribe$ = new Subject();
  pageTitleKey = '';
  defaultLanguageKey = APP_CONFIGS.DEFAULT_LANGUAGE_KEY;
  appLoading$: Observable<boolean> = this.store
    .select(fromRoot.selectLoading)
    .pipe(takeUntil(this.unsubscribe$));

  constructor(
    private store: Store<fromRoot.State>,
    private translate: TranslateService,
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    moment.locale(this.defaultLanguageKey);
    this.handleRouting();
  }

  ngOnInit(): void {
    this.initFirebase();

    this.translate.onLangChange.subscribe((data) => {
      this.titleService.setTitle(data.translations[this.pageTitleKey]);
    });
  }

  private initFirebase = (): void => {
    firebase.initializeApp(environment.FIREBASE);
  };

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
        mergeMap((route) => route.data),
        filter((data) => !isEmpty(data))
      )
      .subscribe((data) => {
        this.translate.get(data.title).subscribe((title: string) => {
          this.titleService.setTitle(title);
        });
      });
  };
}
