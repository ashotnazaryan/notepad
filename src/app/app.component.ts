import { Component } from '@angular/core';

import { ROUTES } from '@shared/constants/routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  notesLink = `${ROUTES.TOOLS.name}/${ROUTES.TOOLS.SUBROUTES.name}`;

  constructor() {

  }
  
}
