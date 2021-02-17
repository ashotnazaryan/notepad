import { AppRoute } from "@shared/models";

export const ROUTES: AppRoute = {
  tools: {
    route: 'tools',
    name: 'Tools',
    langKey: 'GENERAL_PAGES_TOOLS',
    sub_routes: {
      notes: {
        route: 'notes',
        name: 'Notes',
        langKey: 'GENERAL_PAGES_NOTES',
      },
      time: {
        route: 'time',
        name: 'Time',
        langKey: 'GENERAL_PAGES_TIME',
      },
      grocery: {
        route: 'grocery',
        name: 'Grocery',
        langKey: 'GENERAL_PAGES_GROCERY',
      }
    }
  },
  notifications: {
    route: 'notifications',
    name: 'Notifications',
    langKey: 'GENERAL_PAGES_NOTIFICATIONS',
    sub_routes: {
      grocery: {
        route: 'grocery',
        name: 'Grocery',
        langKey: 'GENERAL_PAGES_GROCERY',
      }
    }
  }
}