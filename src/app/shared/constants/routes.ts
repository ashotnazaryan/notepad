import { AppRoute } from "@shared/models";

export const ROUTES: AppRoute = {
  tools: {
    route: 'tools',
    name: 'Tools',
    langKey: 'GENERAL_TOOLTIPS_TOOLS',
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
      }
    }
  }
}