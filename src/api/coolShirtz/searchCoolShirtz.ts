import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { searchFunction } from '../apiWebsites';
import { requestClothes } from '../common/requestClothes';
import { HEADERS } from '../constants';
import { COOL_SHIRTZ_SEARCH_LIMIT, makeCoolShirtzSearchUrl } from './constants';
import { scrapeSearchHtml } from './scrapers/scrapeSearchHtml';

export const searchCoolShirtz: searchFunction = async (
  query: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const cacheKey = `cool-shirtz-search-${query}`;

  return await requestClothes(
    query,
    cacheKey,
    COOL_SHIRTZ_SEARCH_LIMIT,
    requestOptions,
    requestData
  );
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
