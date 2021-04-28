import { parseToEnumValue } from './util/parseToEnumValue';

export const NO_WEBSITES_FOUND_API_ERROR_RESPONSE_MESSAGE =
  'no websites selected';

export enum LocalStorageKey {
  Websites = 'websites',
  Favourites = 'favourites',
  Sort = 'sort',
  Gender = 'gender',
  LightMode = 'lightMode',
}

export enum ClotheSortOption {
  NEWEST = 'newest',
  BEST_SELLING = 'bestSelling',
  PRICE_LOW_TO_HIGH = 'priceLowToHigh',
  PRICE_HIGH_TO_LOW = 'priceHighToLow',
}

export const clotheSortOptionValues: string[] = Object.values(ClotheSortOption);
export const parseClotheSortOption = (
  value: unknown
): ClotheSortOption | undefined =>
  parseToEnumValue<ClotheSortOption>(value, clotheSortOptionValues);

export enum Gender {
  MEN = 'mens',
  WOMEN = 'womens',
  UNISEX = 'unisex',
}

export enum Paths {
  websites = '/websites',
  mens = `/mens`,
  mensWebsites = '/mens/websites',
  womens = '/womens',
  womensWebsites = '/womens/websites',
}

export const genderValues: string[] = Object.values(Gender);
export const parseGender = (value: unknown): Gender | undefined =>
  parseToEnumValue<Gender>(value, genderValues);
