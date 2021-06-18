import { Menu } from '@shared/models';
import { ROUTES } from './routes';

export const MENU_ITEMS: { [key: string]: Array<Menu> } = {
  tools: [
    {
      key: `${ROUTES.admin.sub_routes?.tools.route}/${ROUTES.admin.sub_routes?.tools.sub_routes?.notes.route}`,
      name: `${ROUTES.admin.sub_routes?.tools.sub_routes?.notes.name}`,
      route: `${ROUTES.admin.sub_routes?.tools.route}/${ROUTES.admin.sub_routes?.tools.sub_routes?.notes.route}`,
      langKey: `${ROUTES.admin.sub_routes?.tools.sub_routes?.notes.langKey}`
    },
    {
      key: `${ROUTES.admin.sub_routes?.tools.route}/${ROUTES.admin.sub_routes?.tools.sub_routes?.grocery.route}`,
      name: `${ROUTES.admin.sub_routes?.tools.sub_routes?.grocery.name}`,
      route: `${ROUTES.admin.sub_routes?.tools.route}/${ROUTES.admin.sub_routes?.tools.sub_routes?.grocery.route}`,
      langKey: `${ROUTES.admin.sub_routes?.tools.sub_routes?.grocery.langKey}`
    },
    {
      key: `${ROUTES.admin.sub_routes?.tools.route}/${ROUTES.admin.sub_routes?.tools.sub_routes?.password_generator.route}`,
      name: `${ROUTES.admin.sub_routes?.tools.sub_routes?.password_generator.name}`,
      route: `${ROUTES.admin.sub_routes?.tools.route}/${ROUTES.admin.sub_routes?.tools.sub_routes?.password_generator.route}`,
      langKey: `${ROUTES.admin.sub_routes?.tools.sub_routes?.password_generator.langKey}`
    }
  ],
  widgets: [
    {
      key: `${ROUTES.admin.sub_routes?.widgets.route}/${ROUTES.admin.sub_routes?.widgets.sub_routes?.time.route}`,
      name: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.time.sub_routes?.time.name}`,
      route: `${ROUTES.admin.sub_routes?.widgets.route}/${ROUTES.admin.sub_routes?.widgets.sub_routes?.time.route}`,
      langKey: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.time.langKey}`
    },
    {
      key: `${ROUTES.admin.sub_routes?.widgets.route}/${ROUTES.admin.sub_routes?.widgets.sub_routes?.weather.route}`,
      name: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.weather.name}`,
      route: `${ROUTES.admin.sub_routes?.widgets.route}/${ROUTES.admin.sub_routes?.widgets.sub_routes?.weather.route}`,
      langKey: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.weather.langKey}`
    },
    {
      key: `${ROUTES.admin.sub_routes?.widgets.route}/${ROUTES.admin.sub_routes?.widgets.sub_routes?.game.route}`,
      name: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.game.name}`,
      route: `${ROUTES.admin.sub_routes?.widgets.route}/${ROUTES.admin.sub_routes?.widgets.sub_routes?.game.route}`,
      langKey: `${ROUTES.admin.sub_routes?.widgets.sub_routes?.game.langKey}`
    }
  ],
  notifications: [
    {
      key: `${ROUTES.admin.sub_routes?.notifications.route}/${ROUTES.admin.sub_routes?.notifications.sub_routes?.grocery.route}`,
      name: `${ROUTES.admin.sub_routes?.notifications.sub_routes?.grocery.name}`,
      route: `${ROUTES.admin.sub_routes?.notifications.route}/${ROUTES.admin.sub_routes?.notifications.sub_routes?.grocery.route}`,
      langKey: `${ROUTES.admin.sub_routes?.notifications.sub_routes?.grocery.langKey}`
    },
    {
      key: `${ROUTES.admin.sub_routes?.notifications.route}/${ROUTES.admin.sub_routes?.notifications.sub_routes?.notes.route}`,
      name: `${ROUTES.admin.sub_routes?.notifications.sub_routes?.notes.name}`,
      route: `${ROUTES.admin.sub_routes?.notifications.route}/${ROUTES.admin.sub_routes?.notifications.sub_routes?.notes.route}`,
      langKey: `${ROUTES.admin.sub_routes?.notifications.sub_routes?.notes.langKey}`
    }
  ]
};
