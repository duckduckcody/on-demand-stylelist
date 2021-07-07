import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { searchFunction } from '../apiWebsites';
import { requestClothes } from '../common/requestClothes';
import { HEADERS } from '../constants';
import {
  makeUniversalStoreSearchUrl,
  UNIVERSAL_STORE_LIMIT,
} from './constants';
import { scrapeListHtml } from './scrapers/scrapeListHtml';

export const searchUniversalStore: searchFunction = async (
  query: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const cacheKey = `universal-store-search-${query}`;

  return await requestClothes(
    query,
    cacheKey,
    UNIVERSAL_STORE_LIMIT,
    requestOptions,
    requestData
  );
};

const requestData = (
  key: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> =>
  fetch(makeUniversalStoreSearchUrl(key, requestOptions), {
    headers: HEADERS,
  })
    .then((res) => res.text())
    .then((htmlString) => scrapeListHtml(htmlString))
    .catch((e) => {
      console.error('Error scraping Universal Store', e);
      return Promise.resolve([]);
    });
