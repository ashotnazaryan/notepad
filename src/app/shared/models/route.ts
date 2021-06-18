export interface ModulePage {
  module: string;
  page: string;
}

export interface AppRoute {
  [prop: string]: {
    key: string;
    route: string;
    name: string;
    langKey: string;
    sub_routes?: AppRoute;
  };
}
