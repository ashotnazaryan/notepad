import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '@shared/shared.module';
import * as fromTools from './store/reducers';
import { ToolsRoutingModule } from './tools.routing.module';
import { ToolsComponent } from './tools.component';
import { NotesComponent } from './pages/notes/notes.component';
import { TimeComponent } from './pages/time/time.component';
import { GroceryComponent } from './pages/grocery/grocery.component';
import { GroceryDialogComponent } from './pages/grocery/components/grocery-dialog/grocery-dialog.component';

@NgModule({
  declarations: [
    ToolsComponent,
    NotesComponent,
    TimeComponent,
    GroceryComponent,
    GroceryDialogComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    ToolsRoutingModule,
    StoreModule.forFeature(fromTools.toolsFeatureKey, fromTools.reducers),
  ],
  entryComponents: [
    GroceryDialogComponent
  ]
})
export class ToolsModule { }
