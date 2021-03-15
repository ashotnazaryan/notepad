import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { of } from 'rxjs/internal/observable/of';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { filter, map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import * as moment from 'moment';
import { isEmpty } from 'lodash';

import { MENU_ITEMS } from '@core/constants';
import { GoogleUser, ModulePage } from '@core/models';
import { LANGUAGES } from '@shared/constants';
import { SetModulePage } from '@shared/store/actions/module-page.actions';
import * as fromRoot from '@shared/store/reducers';
import * as fromTools from '@modules/tools/store/reducers';
import * as fromAuth from '@modules/authentication/store/reducers';
import { Language } from '@shared/models';
import { getModulePage } from '@shared/utils';
import { SetLanguage } from '@shared/store/actions/language.actions';
import { ButtonSize } from '@shared/components/button/button.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() readonly pageTitleKeyReceived = new EventEmitter<string>();

  private unsubscribe$ = new Subject();
  clockFormat = 'h:mm A';
  languages = LANGUAGES;
  menuItems = MENU_ITEMS;

  modulePage$: Observable<ModulePage> = this.store
    .select(fromRoot.selectModulePage)
    .pipe(takeUntil(this.unsubscribe$));

  currentLanguage$: Observable<Language> = this.store
    .select(fromRoot.selectLanguage)
    .pipe(takeUntil(this.unsubscribe$));

  totalCount$: Observable<number> = of(0);

  user$: Observable<GoogleUser> = this.store
    .select(fromAuth.selectUser)
    .pipe(takeUntil(this.unsubscribe$));

  readonly ButtonSize = ButtonSize;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private store: Store<fromRoot.State & fromTools.State & fromAuth.State>,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.handleRouting();
    this.setNotificationsCount();
  }

  changeLanguage = (language: Language): void => {
    moment.locale(language.key);
    this.translate.use(language.key);
    this.store.dispatch(SetLanguage(language));
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
        this.pageTitleKeyReceived.emit(data.title as string);

        this.translate.get(data.title).subscribe((title: string) => {
          this.titleService.setTitle(title);
        });
      });
  };

  private setNotificationsCount = (): void => {
    const notifications$ = [
      this.store.pipe(select(fromTools.selectChosenGroceriesCount)),
      this.store.pipe(select(fromTools.selectNotesCount))
    ];

    this.totalCount$ = combineLatest(notifications$).pipe(
      takeUntil(this.unsubscribe$),
      tap((data) => {
        this.menuItems = {
          ...this.menuItems,
          notifications: this.menuItems.notifications.map((item, index) => ({
            ...item,
            badgeCount: data[index] // NOTE the sequence is important
          }))
        };
      }),
      map((data) => data.reduce((acc, curr) => acc + curr, 0))
    );
  };

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
