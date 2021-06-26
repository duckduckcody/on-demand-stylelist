import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { requestClothes } from '../common/requestClothes';
import { HEADERS } from '../constants';
import {
  makeUniversalStoreUrl,
  universalStoreCidMap,
  UNIVERSAL_STORE_LIMIT,
} from './constants';
import { scrapeListHtml } from './scrapeListHtml';

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
): Promise<Partial<ClotheItem>[]> =>
  fetch(makeUniversalStoreUrl(key, requestOptions), {
    headers: HEADERS,
  })
    .then((res) => res.text())
    .then((htmlString) => scrapeListHtml(htmlString));
