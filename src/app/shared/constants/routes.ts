import { AppRoute } from "@shared/models/route";

export const ROUTES: AppRoute = {
  tools: {
    route: 'tools',
    name: 'Tools',
    sub_routes: {
      notes: {
        route: 'notes',
        name: 'Notes'
      },
      time: {
        route: 'time',
        name: 'Time'
      }
    }
  }
}