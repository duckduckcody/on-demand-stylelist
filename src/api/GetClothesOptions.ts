import * as z from 'zod';
import { Sort } from './getClothes';

export type GetClothesOptions = {
  limit: number;
  page: number;
  /**
   * @default newest
   */
  sort: Sort;
};

const ZSort = z.enum([
  'priceHighToLow',
  'priceLowToHigh',
  'bestSelling',
  'newest',
]);

export const GetClothesOptionsSchema = z.object({
  limit: z.number(),
  page: z.number(),
  sort: ZSort,
});
