import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
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

  const cacheKey = `universal-store-${universalStoreCid}-${requestOptions.sort}`;

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
): Promise<Partial<ClotheItem>[]> => {
  const fetchStart = process.hrtime();
  return fetch(makeUniversalStoreListUrl(key, requestOptions), {
    headers: HEADERS,
  })
    .then((res) => {
      const fetchEnd = process.hrtime(fetchStart);
      console.info(
        'Fetch execution time (hr): %ds %dms',
        fetchEnd[0],
        fetchEnd[1] / 1000000
      );
      return res.text();
    })
    .then((htmlString) => {
      const scrapeStart = process.hrtime();
      const scraped = scrapeListHtml(htmlString);
      const scrapeEnd = process.hrtime(scrapeStart);
      console.info(
        'Scrape execution time (hr): %ds %dms',
        scrapeEnd[0],
        scrapeEnd[1] / 1000000
      );
      return scraped;
    });
};
