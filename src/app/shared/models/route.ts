export interface ModulePage {
  module?: string;
  page?: string;
}

export interface AppRoute {
  [key: string]: {
    route: string;
    name: string;
    sub_routes: {
      [key: string]: {
        route: string;
        name: string;
      }
    }
  }
}