import { Promise } from 'bluebird';
import { cacheRequest } from '../cacheRequest';
import { HEADERS } from '../constants';
import {
  ClotheItem,
  clothesCache,
  GetClothesOptions,
  makeClothesCacheKey,
} from '../getClothes';
import { getCultureKingsAlgoliaIndex } from './algoliaIndex';
import {
  cultureKingsCidMap,
  CULTURE_KINGS_ALGOLIA_FILTERS,
  CULTURE_KINGS_URL,
} from './constants';

export const getClothesCultureKings = (
  cid: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const cultureKingsCid = cultureKingsCidMap.get(cid);
  if (!cultureKingsCid) Promise.resolve([]);
  const res = cacheRequest(
    requestData,
    clothesCache,
    makeClothesCacheKey('culture-kings', cid, requestOptions),
    cultureKingsCid!.uri,
    requestOptions
  );
  return res;
};

interface AlgoliaHits {
  title: string;
  price: number;
  handle: string;
  image: string;
}

const requestData = (
  uri: string,
  requestOptions: GetClothesOptions
): Promise<ClotheItem[]> => {
  return getCultureKingsAlgoliaIndex(requestOptions.sort)
    .search<AlgoliaHits>('', {
      hitsPerPage: requestOptions.limit,
      ruleContexts: [`collection-${uri}`],
      page: requestOptions.page - 1,
      filters: `${CULTURE_KINGS_ALGOLIA_FILTERS} ${uri}`,
      headers: {
        Referer: CULTURE_KINGS_URL,
        ...HEADERS,
      },
    })
    .then(({ hits }) => mapProductValues(hits));
};

const mapProductValues = (hits: Array<AlgoliaHits>): ClotheItem[] =>
  hits.map((product) => ({
    name: product.title,
    price: product.price,
    link: `${CULTURE_KINGS_URL}/products/${product.handle}`,
    image: product.image,
    website: 'Culture Kings',
  }));
