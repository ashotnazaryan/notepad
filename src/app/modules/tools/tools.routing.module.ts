import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '@shared/constants/routes';
import { NotesComponent } from './pages/notes/notes.component';
import { TimeComponent } from './pages/time/time.component';
import { ToolsComponent } from './tools.component';

const routes: Routes = [
  {
    path: '',
    component: ToolsComponent,
    children: [
      {
        path: '',
        redirectTo: `${ROUTES.TOOLS.SUB_ROUTES.NOTES.name}`,
        pathMatch: 'full'
      },
      {
        path: `${ROUTES.TOOLS.SUB_ROUTES.NOTES.name}`,
        component: NotesComponent
      },
      {
        path: `${ROUTES.TOOLS.SUB_ROUTES.TIME.name}`,
        component: TimeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }