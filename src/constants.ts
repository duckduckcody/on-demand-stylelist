export const NO_WEBSITES_FOUND_API_ERROR_RESPONSE_MESSAGE =
  'no websites selected';

export enum LocalStorageKey {
  Websites = 'websites',
  Favourites = 'favourites',
  Sort = 'sort',
  Gender = 'gender',
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

export const clotheSortOptions: string[] = Object.values(ClotheSortOption);
export const parseClotheSortOption = (
  sort: string | string[] | undefined | null
): ClotheSortOption | undefined => {
  if (clotheSortOptions.includes(`${sort}`)) return sort as ClotheSortOption;
  return undefined;
};

export enum Gender {
  MEN = 'mens',
  WOMEN = 'womens',
  UNISEX = 'unisex',
}

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
  { id: 3004, name: 'tshirts', gender: Gender.MEN },
  { id: 3005, name: 'skirts', gender: Gender.WOMEN },
  { id: 3006, name: 'dresses', gender: Gender.WOMEN },
];
