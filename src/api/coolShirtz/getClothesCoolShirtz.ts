import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { clothesCache, stdCacheTTL } from '../common/cache';
import { HEADERS } from '../constants';
import { coolShirtzCidMap, makeCoolShirtzUrl } from './constants';
import { scrapeProductHtml } from './scrapers/scrapeProductHtml';
import { differenceInSeconds } from 'date-fns';
import { WebsiteId } from '../../websites';
import fetch from 'node-fetch';

export async function getClothesCoolShirtz(
  cid: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> {
  const coolShirtzCid = coolShirtzCidMap.get(parseInt(cid));
  if (!coolShirtzCid) return Promise.resolve([]);

  fetch(
    'https://www.asos.com/api/product/search/v2/?channel=desktop-web&country=AU&currency=AUD&keyStoreDataversion=hgk0y12-29&lang=en-AU&limit=72&offset=72&q=shirt&rowlength=4&store=AU'
  )
    .then((response) => response.json())
    .then((json) => console.log('ASOS JSON RESPONSE', json));

  const cacheKey = `list~${WebsiteId.COOL_SHIRTZ}~${cid}~${requestOptions.sort}`;

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
      clothesCache.set(
        cacheKey,
        clothes,
        ttl ? differenceInSeconds(new Date(ttl), new Date()) : stdCacheTTL
      );
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
