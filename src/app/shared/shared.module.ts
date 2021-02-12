import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule} from './material/material.module';
import { PaperComponent } from './components/paper/paper.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { ButtonComponent } from './components/button/button.component';
import { ClockComponent } from './components/clock/clock.component';

const components = [
  PaperComponent, 
  UploadButtonComponent,
  ButtonComponent,
  ClockComponent
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ...components
  ]
})
export class SharedModule { }
