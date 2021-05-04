import { parseToEnumValue } from '../client/util/parseToEnumValue';

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
