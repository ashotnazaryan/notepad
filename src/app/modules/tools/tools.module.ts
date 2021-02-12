import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { ToolsComponent } from './tools.component';
import { NotesComponent } from './pages/notes/notes.component';
import { ToolsRoutingModule } from './tools.routing.module';

@NgModule({
  declarations: [
    ToolsComponent,
    NotesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ToolsRoutingModule
  ]
})
export class ToolsModule { }
