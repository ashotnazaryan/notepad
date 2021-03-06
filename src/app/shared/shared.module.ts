import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from './material/material.module';
import { PaperComponent } from './components/paper/paper.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { ButtonComponent } from './components/button/button.component';
import { ClockComponent } from './components/clock/clock.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { GroceryListComponent } from './components/grocery-list/grocery-list.component';
import { NotificationComponent } from './components/notification/notification.component';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

const components = [
  PaperComponent,
  UploadButtonComponent,
  ButtonComponent,
  ClockComponent,
  BreadcrumbsComponent,
  GroceryListComponent,
  NotificationComponent,
  WeatherWidgetComponent,
  SpinnerComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ...components
  ]
})
export class SharedModule {}
