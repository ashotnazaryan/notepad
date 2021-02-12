import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { NotesComponent } from './notes.component';
import { NotesRoutingModule } from './notes.routing.module';

@NgModule({
  declarations: [NotesComponent],
  imports: [
    CommonModule,
    SharedModule,
    NotesRoutingModule
  ]
})
export class NotesModule { }
