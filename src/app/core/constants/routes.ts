import { AppRoute } from "@shared/models";

export const ROUTES: AppRoute = {
  tools: {
    key: 'tools',
    route: 'tools',
    name: 'Tools',
    langKey: 'GENERAL_PAGES_TOOLS',
    sub_routes: {
      notes: {
        key: 'notes',
        route: 'notes',
        name: 'Notes',
        langKey: 'GENERAL_PAGES_NOTES',
      },
      time: {
        key: 'time',
        route: 'time',
        name: 'Time',
        langKey: 'GENERAL_PAGES_TIME',
      },
      grocery: {
        key: 'grocery',
        route: 'grocery',
        name: 'Grocery',
        langKey: 'GENERAL_PAGES_GROCERY',
      },
      weather: {
        key: 'weather',
        route: 'weather',
        name: 'Weather',
        langKey: 'GENERAL_PAGES_WEATHER',
      }
    }
  },
  notifications: {
    key: 'notifications',
    route: 'notifications',
    name: 'Notifications',
    langKey: 'GENERAL_PAGES_NOTIFICATIONS',
    sub_routes: {
      notes: {
        key: 'notes',
        route: 'notes',
        name: 'Notes',
        langKey: 'GENERAL_PAGES_NOTES',
      },
      grocery: {
        key: 'grocery',
        route: 'grocery',
        name: 'Grocery',
        langKey: 'GENERAL_PAGES_GROCERY',
      }
    }
  }
}