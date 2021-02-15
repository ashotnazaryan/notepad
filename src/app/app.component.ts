import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/operators';

import { ROUTES } from '@shared/constants/routes';
import { SetPage } from '@shared/store/actions/page.actions';
import * as fromPage from '@shared/store/reducers';
import { ModulePage } from '@shared/models/route';
import { getModulePage } from '@shared/utils/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  notesLink = `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.notes.route}`;
  timeLink = `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.time.route}`;
  modulePage$: Observable<ModulePage> = this.store.select(fromPage.selectPage);

  constructor(
    private router: Router,
    private store: Store<fromPage.State>
  ) {
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event) => {
        const modulePage = getModulePage(event);

        this.store.dispatch(SetPage(modulePage));
      });
  }

  ngOnInit(): void {

  }

}
