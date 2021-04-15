import { parseToEnumValue } from './util/parseToEnumValue';

export const MOBILE_BREAKPOINT = '768px';

export const NO_WEBSITES_FOUND_API_ERROR_RESPONSE_MESSAGE =
  'no websites selected';

export enum LocalStorageKey {
  Websites = 'websites',
  Favourites = 'favourites',
  Sort = 'sort',
  Gender = 'gender',
  LightMode = 'lightMode',
}

export enum Paths {
  websites = '/websites',
  mens = '/mens',
  womens = '/womens',
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

export const genderValues: string[] = Object.values(Gender);
export const parseGender = (value: unknown): Gender | undefined =>
  parseToEnumValue<Gender>(value, genderValues);

export interface Category {
  id: number;
  name: string;
  gender: Gender;
}

export const categories: Category[] = [
  { id: 3000, name: 'hoodies', gender: Gender.MEN },
  { id: 3001, name: 'jackets', gender: Gender.MEN },
  { id: 3002, name: 'jumpers', gender: Gender.MEN },
  { id: 3003, name: 'shorts', gender: Gender.MEN },
  { id: 3007, name: 'boots', gender: Gender.MEN },
  { id: 3008, name: 'shoes', gender: Gender.MEN },
  { id: 3004, name: 'shirts', gender: Gender.MEN },
  { id: 3005, name: 'skirts', gender: Gender.WOMEN },
  { id: 3006, name: 'dresses', gender: Gender.WOMEN },
];

export const makeCategoryLink = (category: Category): string =>
  `/clothes/${category.gender}/${category.name}`;

export const makeCategoryImageLink = (category: Category): string =>
  `/shop_${category.gender}_${category.name}.webp`;
