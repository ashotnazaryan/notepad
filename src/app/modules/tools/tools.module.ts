import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared/shared.module';
import { ToolsRoutingModule } from './tools.routing.module';
import { ToolsComponent } from './tools.component';
import { NotesComponent } from './pages/notes/notes.component';
import { GroceryComponent } from './pages/grocery/grocery.component';
import { GroceryDialogComponent } from './pages/grocery/components/grocery-dialog/grocery-dialog.component';
import { PasswordGeneratorComponent } from './pages/password-generator/password-generator.component';

@NgModule({
  declarations: [
    ToolsComponent,
    NotesComponent,
    GroceryComponent,
    GroceryDialogComponent,
    PasswordGeneratorComponent
  ],
  imports: [
    ToolsRoutingModule,
    CommonModule,
    TranslateModule,
    SharedModule
  ],
  entryComponents: [GroceryDialogComponent]
})
export class ToolsModule {}
