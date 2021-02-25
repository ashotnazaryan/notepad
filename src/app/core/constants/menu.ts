import { Menu } from "@core/models";
import { ROUTES } from "./routes";

export const MENU_ITEMS: { [key: string]: Array<Menu> } = {
  tools: [
    {
      name: `${ROUTES.tools.sub_routes.notes.name}`,
      route: `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.notes.route}`,
      langKey: `${ROUTES.tools.sub_routes.notes.langKey}`
    },
    {
      name: `${ROUTES.tools.sub_routes.grocery.name}`,
      route: `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.grocery.route}`,
      langKey: `${ROUTES.tools.sub_routes.grocery.langKey}`
    },
    {
      name: `${ROUTES.tools.sub_routes.time.name}`,
      route: `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.time.route}`,
      langKey: `${ROUTES.tools.sub_routes.time.langKey}`
    },
    {
      name: `${ROUTES.tools.sub_routes.weather.name}`,
      route: `${ROUTES.tools.route}/${ROUTES.tools.sub_routes.weather.route}`,
      langKey: `${ROUTES.tools.sub_routes.weather.langKey}`
    }
  ],
  notifications: [
    {
      name: `${ROUTES.notifications.sub_routes.grocery.name}`,
      route: `${ROUTES.notifications.route}/${ROUTES.notifications.sub_routes.grocery.route}`,
      langKey: `${ROUTES.notifications.sub_routes.grocery.langKey}`
    },
  ]
}