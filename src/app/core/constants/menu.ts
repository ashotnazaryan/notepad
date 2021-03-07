import { Menu } from '@core/models';
import { ROUTES } from './routes';

export const MENU_ITEMS: { [key: string]: Array<Menu> } = {
  tools: [
    {
      key: `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.notes.route}`,
      name: `${ROUTES.tools.sub_routes.notes.name}`,
      route: `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.notes.route}`,
      langKey: `${ROUTES.tools.sub_routes.notes.langKey}`
    },
    {
      key: `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.grocery.route}`,
      name: `${ROUTES.tools.sub_routes.grocery.name}`,
      route: `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.grocery.route}`,
      langKey: `${ROUTES.tools.sub_routes.grocery.langKey}`
    },
    {
      key: `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.password_generator.route}`,
      name: `${ROUTES.tools.sub_routes.password_generator.name}`,
      route: `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.password_generator.route}`,
      langKey: `${ROUTES.tools.sub_routes.password_generator.langKey}`
    }
  ],
  widgets: [
    {
      key: `${ROUTES.widgets.route}/${ROUTES.widgets.sub_routes.time.route}`,
      name: `${ROUTES.widgets.sub_routes.time.name}`,
      route: `${ROUTES.widgets.route}/${ROUTES.widgets.sub_routes.time.route}`,
      langKey: `${ROUTES.widgets.sub_routes.time.langKey}`
    },
    {
      key: `${ROUTES.widgets.route}/${ROUTES.widgets.sub_routes.weather.route}`,
      name: `${ROUTES.widgets.sub_routes.weather.name}`,
      route: `${ROUTES.widgets.route}/${ROUTES.widgets.sub_routes.weather.route}`,
      langKey: `${ROUTES.widgets.sub_routes.weather.langKey}`
    },
    {
      key: `${ROUTES.widgets.route}/${ROUTES.widgets.sub_routes.game.route}`,
      name: `${ROUTES.widgets.sub_routes.game.name}`,
      route: `${ROUTES.widgets.route}/${ROUTES.widgets.sub_routes.game.route}`,
      langKey: `${ROUTES.widgets.sub_routes.game.langKey}`
    }
  ],
  notifications: [
    {
      key: `${ROUTES.notifications.route}/${ROUTES.notifications.sub_routes.grocery.route}`,
      name: `${ROUTES.notifications.sub_routes.grocery.name}`,
      route: `${ROUTES.notifications.route}/${ROUTES.notifications.sub_routes.grocery.route}`,
      langKey: `${ROUTES.notifications.sub_routes.grocery.langKey}`
    },
    {
      key: `${ROUTES.notifications.route}/${ROUTES.notifications.sub_routes.notes.route}`,
      name: `${ROUTES.notifications.sub_routes.notes.name}`,
      route: `${ROUTES.notifications.route}/${ROUTES.notifications.sub_routes.notes.route}`,
      langKey: `${ROUTES.notifications.sub_routes.notes.langKey}`
    }
  ]
};
