export const NO_WEBSITES_FOUND_API_ERROR_RESPONSE_MESSAGE =
  'no websites selected';

export enum LocalStorageKey {
  Websites = 'websites',
  Favourites = 'favourites',
  Sort = 'sort',
}

export enum Paths {
  websites = '/websites',
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
