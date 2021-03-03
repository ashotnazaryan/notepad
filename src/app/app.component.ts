import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

import { APP_CONFIGS } from '@core/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  defaultLanguageKey = APP_CONFIGS.DEFAULT_LANGUAGE_KEY;
  pageTitleKey = '';

  constructor(
    private titleService: Title,
    private translate: TranslateService
  ) {
    moment.locale(this.defaultLanguageKey);
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((data) => {
      this.titleService.setTitle(data.translations[this.pageTitleKey]);
    });
  }

  handlePageTitleKeyReceived = (title: string): void => {
    this.pageTitleKey = title;
  };
}
