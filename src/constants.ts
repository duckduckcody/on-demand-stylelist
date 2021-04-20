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
}

export interface Category {
  id: number;
  name: CategoryName;
  gender: Gender;
}

export const categories: Category[] = [
  { id: 3000, name: CategoryName.SHIRTS, gender: Gender.MEN },
  { id: 3001, name: CategoryName.JUMPERS, gender: Gender.MEN },
  { id: 3002, name: CategoryName.HOODIES, gender: Gender.MEN },
  { id: 3003, name: CategoryName.JACKETS, gender: Gender.MEN },
  { id: 3004, name: CategoryName.SHORTS, gender: Gender.MEN },
  { id: 3005, name: CategoryName.JEANS, gender: Gender.MEN },
  { id: 3006, name: CategoryName.SHOES, gender: Gender.MEN },
  { id: 3007, name: CategoryName.BOOTS, gender: Gender.MEN },
  { id: 4000, name: CategoryName.SKIRTS, gender: Gender.WOMEN },
  { id: 4001, name: CategoryName.DRESSES, gender: Gender.WOMEN },
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
  `/shop_${category.gender}_${category.name}.webp`;
