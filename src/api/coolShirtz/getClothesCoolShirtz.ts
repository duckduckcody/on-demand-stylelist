import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { clothesCache } from '../cache';
import { HEADERS } from '../constants';
import { pageClothes } from '../pageClothes';
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
      clothesCache.set(cacheKey, clothes);
      return pageClothes(clothes, requestOptions);
    })
    .catch((e) => {
      console.error('Error scraping Cool Shirtz', e);
      return Promise.reject(
        new Error(
          'A server error has occurred when fetching styles from Cool Shirtz'
        )
      );
    });
}
