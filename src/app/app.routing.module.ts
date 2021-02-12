import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ROUTES } from '@shared/constants/routes';
import { environment } from '@environment/environment';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${ROUTES.NOTES}`,
    pathMatch: 'full'
  },
  {
    path: `${ROUTES.NOTES}`,
    loadChildren: () => import('@modules/notes/notes.module').then(m => m.NotesModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.production })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
