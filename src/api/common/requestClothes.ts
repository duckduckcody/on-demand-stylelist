import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { clothesCache, stdCacheTTL } from '../common/cache';
import { recursiveGetClothes } from '../common/recursiveGetClothes';
import { differenceInSeconds } from 'date-fns';

export const requestClothes = async (
  key: string,
  cacheKey: string,
  websitesLimit: number,
  requestOptions: GetClothesOptions,
  requestData: (
    key: string,
    requestOptions: GetClothesOptions
  ) => Promise<Partial<ClotheItem>[]>
): Promise<Partial<ClotheItem>[]> => {
  const lastIndex = requestOptions.page * requestOptions.limit;
  const firstIndex = lastIndex - requestOptions.limit;

  const cachedClothes: Partial<ClotheItem>[] = clothesCache.get(cacheKey) || [];

  const clothes = await recursiveGetClothes(
    cachedClothes,
    key,
    requestOptions,
    requestData,
    websitesLimit,
    lastIndex
  );

  // const ttl = clothesCache.getTtl(cacheKey);
  // clothesCache.set(
  //   cacheKey,
  //   clothes,
  //   ttl ? differenceInSeconds(new Date(ttl), new Date()) : stdCacheTTL
  // );

  clothesCache.set(cacheKey, clothes, 1);

  return clothes.slice(firstIndex, lastIndex);
};
