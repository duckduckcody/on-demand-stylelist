export enum LocalStorageKey {
  Websites = 'websites',
  Favourites = 'favourites',
  Sort = 'sort',
  Gender = 'gender',
  LightMode = 'lightMode',
  Limit = 'limit',
}

export enum Paths {
  websites = '/websites',
  mens = `/mens`,
  mensWebsites = '/mens/websites',
  womens = '/womens',
  womensWebsites = '/womens/websites',
}

export const LIMIT_OPTIONS = [1, 3, 5, 10, 20, 30];
export const DEFAULT_LIMIT = 3;
