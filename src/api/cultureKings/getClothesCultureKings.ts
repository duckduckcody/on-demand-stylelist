import { Promise } from 'bluebird';
import { recursiveGetClothes } from '../../util/recursiveGetClothes';
import { HEADERS } from '../constants';
import { ClotheItem, clothesCache, GetClothesOptions } from '../getClothes';
import { getCultureKingsAlgoliaIndex } from './algoliaIndex';
import {
  cultureKingsCidMap,
  CULTURE_KINGS_ALGOLIA_FILTERS,
  CULTURE_KINGS_LIMIT,
  CULTURE_KINGS_URL,
} from './constants';

export const getClothesCultureKings = async (
  cid: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const cultureKingsCid = cultureKingsCidMap.get(cid);
  if (!cultureKingsCid) Promise.resolve([]);

  const cacheKey = `culture-kings-${cultureKingsCid!.uri}-${
    requestOptions.sort
  }`;
  const cachedClothes: Partial<ClotheItem>[] = clothesCache.get(cacheKey) || [];

  const clothes = await recursiveGetClothes(
    requestOptions,
    cachedClothes,
    cultureKingsCid!.uri,
    requestData,
    CULTURE_KINGS_LIMIT
  );

  clothesCache.set(cacheKey, clothes);

  const lastIndex = requestOptions.page * requestOptions.limit;
  const firstIndex = lastIndex - requestOptions.limit;
  return clothes.slice(firstIndex, lastIndex);
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
): Promise<ClotheItem[]> =>
  getCultureKingsAlgoliaIndex(requestOptions.sort)
    .search<AlgoliaHits>('', {
      hitsPerPage: requestOptions.limit,
      ruleContexts: [`collection-${uri}`],
      page: requestOptions.page,
      filters: `${CULTURE_KINGS_ALGOLIA_FILTERS} ${uri}`,
      headers: {
        Referer: CULTURE_KINGS_URL,
        ...HEADERS,
      },
    })
    .then(({ hits }) => mapProductValues(hits));

const mapProductValues = (hits: Array<AlgoliaHits>): ClotheItem[] =>
  hits.map((product) => ({
    name: product.title,
    price: product.price,
    link: `${CULTURE_KINGS_URL}/products/${product.handle}`,
    image: product.image,
    website: 'Culture Kings',
  }));
