import { Promise } from 'bluebird';
import { flatten } from 'lodash';
import NodeCache from 'node-cache';
import { DEFAULT_RESPONSE_LIMIT, websites } from './constants';

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

export interface GetClothesOptions {
  limit: number;
  page: number;
}

export const getClothes = async (
  cid: string,
  selectedWebsites: string[],
  requestOptions: Partial<GetClothesOptions>
): Promise<Partial<ClotheItem>[]> => {
  const completeRequestOptions: GetClothesOptions = {
    limit: requestOptions?.limit ?? DEFAULT_RESPONSE_LIMIT,
    page: requestOptions?.page ?? 1,
  };

  return await Promise.map(selectedWebsites, async (selectedWebsiteId) => {
    const website = websites.find(
      (website) => website.id === +selectedWebsiteId
    );
    if (!website) return [];
    return website.function(cid, completeRequestOptions);
  }).then((res) => flatten(res));
};
