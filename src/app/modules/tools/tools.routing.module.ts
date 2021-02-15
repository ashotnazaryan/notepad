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
        redirectTo: `${ROUTES.tools.sub_routes.notes.route}`,
        pathMatch: 'full'
      },
      {
        path: `${ROUTES.tools.sub_routes.notes.route}`,
        component: NotesComponent
      },
      {
        path: `${ROUTES.tools.sub_routes.time.route}`,
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