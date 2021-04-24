import { parseToEnumValue } from './util/parseToEnumValue';

export const MOBILE_PX = 768;
export const MOBILE_BREAKPOINT = `${MOBILE_PX}px`;

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

export enum CategoryName {
  SHIRTS = 'shirts',
  JUMPERS = 'jumpers',
  HOODIES = 'hoodies',
  JACKETS = 'jackets',
  SHORTS = 'shorts',
  JEANS = 'jeans',
  SHOES = 'shoes',
  BOOTS = 'boots',
  SKIRTS = 'skirts',
  DRESSES = 'dresses',
  TRACK_PANTS = 'track pants',
}

export interface Category {
  id: number;
  name: CategoryName;
  gender: Gender;
}

let id = 1;
export const categories: Category[] = [
  { id: id++, name: CategoryName.SHIRTS, gender: Gender.MEN },
  { id: id++, name: CategoryName.JUMPERS, gender: Gender.MEN },
  { id: id++, name: CategoryName.HOODIES, gender: Gender.MEN },
  { id: id++, name: CategoryName.JACKETS, gender: Gender.MEN },
  { id: id++, name: CategoryName.SHORTS, gender: Gender.MEN },
  { id: id++, name: CategoryName.JEANS, gender: Gender.MEN },
  { id: id++, name: CategoryName.TRACK_PANTS, gender: Gender.MEN },
  { id: id++, name: CategoryName.SHOES, gender: Gender.MEN },
  { id: id++, name: CategoryName.BOOTS, gender: Gender.MEN },
  { id: id++, name: CategoryName.SKIRTS, gender: Gender.WOMEN },
  { id: id++, name: CategoryName.DRESSES, gender: Gender.WOMEN },
  { id: id++, name: CategoryName.TRACK_PANTS, gender: Gender.WOMEN },
];
export const getCategoryId = (name: CategoryName, gender: Gender): number => {
  const cat = categories.find(
    (cat) => cat.name === name && cat.gender === gender
  );
  if (!cat)
    throw new Error(
      `getCategoryId - category not found with parameters name:${name} gender:${gender}`
    );
  return cat.id;
};

export const makeCategoryLink = (category: Category): string =>
  `/clothes/${category.gender}/${category.name}`;

export const makeCategoryImageLink = (category: Category): string =>
  `/shop_${category.gender}_${category.name.replace(' ', '_')}.webp`;
