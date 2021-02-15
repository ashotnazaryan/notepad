import { Event, NavigationEnd } from '@angular/router';
import { get, identity } from 'lodash';

import { ROUTES } from '@shared/constants/routes';
import { ModulePage } from '@shared/models/route';

export const getModulePage = (event: Event): ModulePage => {
  // FIXME https://github.com/angular/angular/issues/15439
  const urlArr = (event as NavigationEnd).url.split('/')?.filter(identity);
  const module = urlArr[0];
  const page = urlArr[1];
  const moduleRoute = get(ROUTES, module);
  const pageRoute = get(ROUTES[module].sub_routes, page);

  return { module: moduleRoute.name, page: pageRoute.name };
}