import NodeCache, { Key } from 'node-cache';
import { getClothesFunction, USE_CACHE } from './constants';
import { ClothesResponseItem, GetClothesOptions } from './getClothes';

export const cacheRequest = async (
  requestFunction: getClothesFunction,
  cache: NodeCache,
  cacheKey: Key,
  uri: string,
  requestOptions: GetClothesOptions
) => {
  const cachedValue: Partial<ClothesResponseItem>[] | undefined = cache.get(
    cacheKey
  );
  if (cachedValue && USE_CACHE) return Promise.resolve(cachedValue);

  const response = requestFunction(uri, requestOptions);
  if (USE_CACHE) cache.set(cacheKey, response);
  return response;
};
