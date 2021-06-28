import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { WebsiteId } from '../../websites';
import { requestClothes } from '../common/requestClothes';
import { HEADERS } from '../constants';
import {
  makeUniversalStoreListUrl,
  universalStoreCidMap,
  UNIVERSAL_STORE_LIMIT,
} from './constants';
import { scrapeListHtml } from './scrapers/scrapeListHtml';

export const getClothesUniversalStore = async (
  cid: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const universalStoreCid = universalStoreCidMap.get(parseInt(cid));
  if (!universalStoreCid) return Promise.resolve([]);

  const cacheKey = `list~${WebsiteId.UNIVERSAL_STORE}~${cid}~${requestOptions.sort}`;

  return await requestClothes(
    universalStoreCid,
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
  fetch(makeUniversalStoreListUrl(key, requestOptions), {
    headers: HEADERS,
  })
    .then((res) => res.text())
    .then((htmlString) => scrapeListHtml(htmlString))
    .catch((e) => {
      console.error('Error scraping Universal Store', e);
      return Promise.resolve([]);
    });
