import { Promise } from 'bluebird';
import { flatten } from 'lodash';
import NodeCache from 'node-cache';
import { DEFAULT_RESPONSE_LIMIT, websites } from './constants';
import {
  GetClothesOptions,
  GetClothesOptionsSchema,
} from './GetClothesOptions';

export const clothesCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export const makeClothesCacheKey = (
  prefix: string,
  uri: string,
  requestOptions?: GetClothesOptions
): string => `${prefix}-${uri}-${JSON.stringify(requestOptions)}`;

export interface ClotheItem {
  name: string;
  price: number;
  link: string;
  image: string;
  website: string;
}

export type Sort =
  | 'priceHighToLow'
  | 'priceLowToHigh'
  | 'bestSelling'
  | 'newest';

export const getClothes = async (
  cid: string,
  selectedWebsites: string[],
  requestOptions: Partial<GetClothesOptions>
): Promise<Partial<ClotheItem>[]> => {
  const completeRequestOptions: GetClothesOptions = {
    limit: requestOptions?.limit ?? DEFAULT_RESPONSE_LIMIT,
    page: requestOptions?.page ?? 1,
    sort: requestOptions?.sort ?? 'newest',
  };

  const response = GetClothesOptionsSchema.safeParse(completeRequestOptions);
  console.log('response', response);
  // res.status(404).json({ message: 'clothe category not found' });

  return await Promise.map(selectedWebsites, async (selectedWebsiteId) => {
    const website = websites.find(
      (website) => website.id === +selectedWebsiteId
    );
    if (!website) return [];
    return website.function(cid, completeRequestOptions);
  }).then((res) => flatten(res));
};
