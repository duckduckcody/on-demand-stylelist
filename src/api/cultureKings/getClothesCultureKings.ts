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
  const cultureKingsCid = cultureKingsCidMap.get(parseInt(cid));
  if (!cultureKingsCid) return Promise.resolve([]);

  const lastIndex = requestOptions.page * requestOptions.limit;
  const firstIndex = lastIndex - requestOptions.limit;

  const cacheKey = `culture-kings-${cultureKingsCid!.uri}-${
    requestOptions.sort
  }`;
  const cachedClothes: Partial<ClotheItem>[] = clothesCache.get(cacheKey) || [];

  const clothes = await recursiveGetClothes<{ uri: string }>(
    requestOptions,
    cachedClothes,
    { uri: cultureKingsCid!.uri },
    requestData,
    CULTURE_KINGS_LIMIT,
    lastIndex
  );

  clothesCache.set(cacheKey, clothes);

  return clothes.slice(firstIndex, lastIndex);
};

interface AlgoliaHits {
  title: string;
  price: number;
  compareAtPrice: number;
  handle: string;
  image: string;
}

const requestData = (
  category: { uri: string },
  requestOptions: GetClothesOptions
): Promise<ClotheItem[]> =>
  getCultureKingsAlgoliaIndex(requestOptions.sort)
    .search<AlgoliaHits>('', {
      hitsPerPage: requestOptions.limit,
      page: requestOptions.page - 1,
      ruleContexts: [`collection-${category.uri}`],
      filters: `${CULTURE_KINGS_ALGOLIA_FILTERS}${category.uri}`,
      headers: {
        Referer: CULTURE_KINGS_URL.replace('https://', 'https://www.'),
        ...HEADERS,
      },
    })
    .then(({ hits }) => mapProductValues(hits));

const mapProductValues = (hits: Array<AlgoliaHits>): ClotheItem[] =>
  hits.map((product) => ({
    name: product.title,
    discountedPrice: product.compareAtPrice ? product.price : undefined,
    price: product.compareAtPrice ? product.compareAtPrice : product.price,
    link: `${CULTURE_KINGS_URL}/products/${product.handle}`,
    image: product.image,
    website: 'Culture Kings',
  }));
