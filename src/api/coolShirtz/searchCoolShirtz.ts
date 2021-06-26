import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { searchFunction } from '../apiWebsites';
import { clothesCache } from '../common/cache';
import { recursiveGetClothes } from '../common/recursiveGetClothes';
import { HEADERS } from '../constants';
import { COOL_SHIRTZ_SEARCH_LIMIT, makeCoolShirtzSearchUrl } from './constants';
import { scrapeSearchHtml } from './scrapers/scrapeSearchHtml';

export const searchCoolShirtz: searchFunction = async (
  query: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const lastIndex = requestOptions.page * requestOptions.limit;
  const firstIndex = lastIndex - requestOptions.limit;

  const cacheKey = `cool-shirtz-search-${query}`;
  const cachedClothes: Partial<ClotheItem>[] = clothesCache.get(cacheKey) || [];

  const clothes = await recursiveGetClothes(
    cachedClothes,
    query,
    requestOptions,
    makeCoolShirtzSearchUrl,
    requestData,
    COOL_SHIRTZ_SEARCH_LIMIT,
    lastIndex
  );

  clothesCache.set(cacheKey, clothes);

  return clothes.slice(firstIndex, lastIndex);
};

const requestData = (
  key: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> =>
  fetch(makeCoolShirtzSearchUrl(key, requestOptions), {
    headers: HEADERS,
  })
    .then((res) => res.text())
    .then((htmlString) => scrapeSearchHtml(htmlString));
