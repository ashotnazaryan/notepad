import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule} from './material/material.module';
import { PaperComponent } from './components/paper/paper.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { ButtonComponent } from './components/button/button.component';
import { ClockComponent } from './components/clock/clock.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

const components = [
  PaperComponent, 
  UploadButtonComponent,
  ButtonComponent,
  ClockComponent,
  BreadcrumbsComponent,
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    TranslateModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ...components
  ]
})
export class SharedModule { }
