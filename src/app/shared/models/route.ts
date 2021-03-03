export interface ModulePage {
  module: string;
  page: string;
}

export interface AppRoute {
  [key: string]: {
    key: string;
    route: string;
    name: string;
    langKey: string;
    sub_routes: {
      [key: string]: {
        key: string;
        route: string;
        name: string;
        langKey: string;
      };
    };
  };
}
