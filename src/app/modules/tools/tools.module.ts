import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared/shared.module';
import { ToolsRoutingModule } from './tools.routing.module';
import { ToolsComponent } from './tools.component';
import { NotesComponent } from './pages/notes/notes.component';
import { TimeComponent } from './pages/time/time.component';
import { GroceryComponent } from './pages/grocery/grocery.component';

@NgModule({
  declarations: [
    ToolsComponent,
    NotesComponent,
    TimeComponent,
    GroceryComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    ToolsRoutingModule
  ]
})
export class ToolsModule { }
