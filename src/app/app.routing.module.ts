import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@shared/constants/routes';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: `${ROUTES.TOOLS.name}`,
    pathMatch: 'full'
  },
  {
    path: `${ROUTES.TOOLS.name}`,
    loadChildren: () => import('@modules/tools/tools.module').then(m => m.ToolsModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
