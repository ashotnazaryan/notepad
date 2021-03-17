import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { isEmpty } from 'lodash';

import * as fromRoot from '@shared/store/reducers';
import { SetModulePage } from '@shared/store/actions/module-page.actions';
import { getModulePage } from '@shared/utils';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  pageTitleKey = '';

  constructor(
    private titleService: Title,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromRoot.State>
  ) {
    this.handleRouting();
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((data) => {
      this.titleService.setTitle(data.translations[this.pageTitleKey]);
    });
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
