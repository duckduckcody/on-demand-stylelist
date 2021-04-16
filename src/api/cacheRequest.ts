import NodeCache, { Key } from 'node-cache';
import { USE_CACHE } from './config';
import { getClothesFunction } from './constants';
import { ClotheItem, GetClothesOptions } from './getClothes';

export const cacheRequest = async (
  requestFunction: getClothesFunction,
  cache: NodeCache,
  cacheKey: Key,
  uri: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const cachedValue: Partial<ClotheItem>[] | undefined = cache.get(cacheKey);
  if (cachedValue && USE_CACHE) return Promise.resolve(cachedValue);

  const response = requestFunction(uri, requestOptions);
  if (USE_CACHE) cache.set(cacheKey, response);
  return response;
};
