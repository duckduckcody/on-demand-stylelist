import { Promise } from 'bluebird';
import { flatten } from 'lodash';
import NodeCache from 'node-cache';
import { ClotheSortOption } from '../constants';
import { websites } from './constants';

export const clothesCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

export const makeClothesCacheKey = (
  prefix: string,
  uri: string,
  requestOptions?: GetClothesOptions
): string => `${prefix}-${uri}-${JSON.stringify(requestOptions)}`;

export interface ClotheItem {
  name: string;
  price: number;
  discountedPrice?: number;
  link: string;
  image: string;
  fallbackImage?: string;
  website: string;
  error?: unknown;
}

export interface GetClothesOptions {
  limit: number;
  page: number;
  sort: ClotheSortOption;
}

export const getClothes = async (
  cid: string,
  selectedWebsites: string[],
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> =>
  await Promise.map(selectedWebsites, async (selectedWebsiteId) => {
    const website = websites.find(
      (website) => website.id === +selectedWebsiteId
    );
    if (!website) return [];
    return website.function(cid, requestOptions);
  }).then((res) => flatten(res));
