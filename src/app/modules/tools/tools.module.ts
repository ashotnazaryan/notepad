import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';
import * as fromTools from './store/reducers';
import { NotesEffects, GroceryEffects } from './store/effects';
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
    SharedModule,
    StoreModule.forFeature(fromTools.toolsFeatureKey, fromTools.reducers),
    EffectsModule.forFeature([NotesEffects, GroceryEffects])
  ],
  entryComponents: [GroceryDialogComponent]
})
export class ToolsModule {}
