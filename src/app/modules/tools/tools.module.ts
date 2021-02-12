import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { ToolsRoutingModule } from './tools.routing.module';
import { ToolsComponent } from './tools.component';
import { NotesComponent } from './pages/notes/notes.component';
import { TimeComponent } from './pages/time/time.component';

@NgModule({
  declarations: [
    ToolsComponent,
    NotesComponent,
    TimeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToolsRoutingModule
  ]
})
export class ToolsModule { }
