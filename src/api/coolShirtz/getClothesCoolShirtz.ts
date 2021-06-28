import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { clothesCache, stdCacheTTL } from '../common/cache';
import { HEADERS } from '../constants';
import { coolShirtzCidMap, makeCoolShirtzUrl } from './constants';
import { scrapeProductHtml } from './scrapers/scrapeProductHtml';

export async function getClothesCoolShirtz(
  cid: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> {
  const coolShirtzCid = coolShirtzCidMap.get(parseInt(cid));
  if (!coolShirtzCid) return Promise.resolve([]);

  const cacheKey = `cool-shirtz-${coolShirtzCid!.uri}-${requestOptions.sort}`;

  const cachedValue: Partial<ClotheItem>[] | undefined =
    clothesCache.get(cacheKey);
  if (cachedValue) return pageClothes(cachedValue, requestOptions);

  const url = makeCoolShirtzUrl(coolShirtzCid!.uri, requestOptions);
  return fetch(url, {
    headers: HEADERS,
  })
    .then((res) => res.text())
    .then((htmlString) => scrapeProductHtml(htmlString))
    .then((clothes) => {
      const ttl = clothesCache.getTtl(cacheKey);
      clothesCache.set(cacheKey, clothes, ttl ? ttl : stdCacheTTL);
      return pageClothes(clothes, requestOptions);
    })
    .catch((e) => {
      console.error('Error scraping Cool Shirtz', e);
      return Promise.resolve([]);
    });
}

const pageClothes = (
  clothes: Partial<ClotheItem>[],
  requestOptions: { page: number; limit: number }
): Partial<ClotheItem>[] => {
  if (!clothes) return [];
  const bottom = (requestOptions.page - 1) * requestOptions.limit;
  const top = bottom + requestOptions.limit;
  return clothes!.slice(bottom, top);
};
