import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { of } from 'rxjs/internal/observable/of';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { map, takeUntil, tap } from 'rxjs/operators';
import * as moment from 'moment';

import { MENU_ITEMS, LANGUAGES } from '@shared/constants';
import { ModulePage, Language, ButtonSize } from '@shared/models';
import User from '@shared/models/user';
import * as fromRoot from '@shared/store/reducers';
import * as fromAuth from '@shared/store/reducers';
import * as fromTools from '@shared/store/reducers';
import { SetLanguage } from '@shared/store/actions/language.actions';
import {
  selectChosenGroceriesCount,
  selectNotesCount
} from '@shared/store/selectors';
import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { AuthActions } from '@shared/store/actions';
import { selectLanguage, selectModulePage } from '@shared/store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  clockFormat = 'h:mm A';
  languages = LANGUAGES;
  menuItems = MENU_ITEMS;

  modulePage$: Observable<ModulePage> = this.store
    .select(selectModulePage)
    .pipe(takeUntil(this.unsubscribe$));

  currentLanguage$: Observable<Language> = this.store
    .select(selectLanguage)
    .pipe(takeUntil(this.unsubscribe$));

  totalCount$: Observable<number> = of(0);
  user$: Observable<User> = of(this.authentication.user);
  readonly ButtonSize = ButtonSize;

  constructor(
    private store: Store<fromRoot.State & fromTools.State & fromAuth.State>,
    private translate: TranslateService,
    private authentication: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.setNotificationsCount();
  }

  changeLanguage = (language: Language): void => {
    moment.locale(language.key);
    this.translate.use(language.key);
    this.store.dispatch(SetLanguage(language));
  };

  logout = (): void => {
    this.store.dispatch(AuthActions.Logout());
  };

  private setNotificationsCount = (): void => {
    const notifications$ = [
      this.store.pipe(select(selectChosenGroceriesCount)),
      this.store.pipe(select(selectNotesCount))
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
