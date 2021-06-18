import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ROUTES } from '@shared/constants';
import { ToolsComponent } from './tools.component';
import { NotesComponent } from './pages/notes/notes.component';
import { GroceryComponent } from './pages/grocery/grocery.component';
import { PasswordGeneratorComponent } from './pages/password-generator/password-generator.component';

const routes: Routes = [
  {
    path: '',
    component: ToolsComponent,
    children: [
      {
        path: '',
        redirectTo: `${ROUTES.admin.sub_routes?.tools.sub_routes?.notes.route}`,
        pathMatch: 'full'
      },
      {
        path: `${ROUTES.admin.sub_routes?.tools.sub_routes?.notes.route}`,
        component: NotesComponent,
        data: {
          title: `${ROUTES.admin.sub_routes?.tools.sub_routes?.notes.langKey}`
        }
      },
      {
        path: `${ROUTES.admin.sub_routes?.tools.sub_routes?.grocery.route}`,
        component: GroceryComponent,
        data: {
          title: `${ROUTES.admin.sub_routes?.tools.sub_routes?.grocery.langKey}`
        }
      },
      {
        path: `${ROUTES.admin.sub_routes?.tools.sub_routes?.password_generator.route}`,
        component: PasswordGeneratorComponent,
        data: {
          title: `${ROUTES.admin.sub_routes?.tools.sub_routes?.password_generator.langKey}`
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule {}
