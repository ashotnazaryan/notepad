import { AppRoute } from '@core/models';

export const ROUTES: AppRoute = {
  authentication: {
    key: 'authentication',
    route: 'authentication',
    name: 'Authentication',
    langKey: 'GENERAL_PAGES_AUTHENTICATION',
    sub_routes: {
      login: {
        key: 'login',
        route: 'login',
        name: 'Login',
        langKey: 'GENERAL_PAGES_LOGIN'
      }
    }
  },
  admin: {
    key: 'admin',
    route: '',
    name: 'Admin',
    langKey: '',
    sub_routes: {
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
            langKey: 'GENERAL_PAGES_NOTES'
          },
          grocery: {
            key: 'grocery',
            route: 'grocery',
            name: 'Grocery',
            langKey: 'GENERAL_PAGES_GROCERY'
          },
          password_generator: {
            key: 'password_generator',
            route: 'password_generator',
            name: 'Password generator',
            langKey: 'GENERAL_PAGES_PASSWORD_GENERATOR'
          }
        }
      },
      widgets: {
        key: 'widgets',
        route: 'widgets',
        name: 'Widgets',
        langKey: 'GENERAL_PAGES_WIDGETS',
        sub_routes: {
          time: {
            key: 'time',
            route: 'time',
            name: 'Time',
            langKey: 'GENERAL_PAGES_TIME'
          },
          weather: {
            key: 'weather',
            route: 'weather',
            name: 'Weather',
            langKey: 'GENERAL_PAGES_WEATHER'
          },
          game: {
            key: 'game',
            route: 'game',
            name: 'Game',
            langKey: 'GENERAL_PAGES_GAME'
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
            langKey: 'GENERAL_PAGES_NOTES'
          },
          grocery: {
            key: 'grocery',
            route: 'grocery',
            name: 'Grocery',
            langKey: 'GENERAL_PAGES_GROCERY'
          }
        }
      }
    }
  }
};
