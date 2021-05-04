import { Promise } from 'bluebird';
import { recursiveGetClothes } from '../../client/util/recursiveGetClothes';
import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { clothesCache } from '../cache';
import {
  CultureKingsAlgoliaHits,
  CULTURE_KINGS_ALGOLIA_HEADERS,
  getCultureKingsAlgoliaIndex,
} from './algoliaIndex';
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

const requestData = (
  category: { uri: string },
  requestOptions: GetClothesOptions
): Promise<ClotheItem[]> =>
  getCultureKingsAlgoliaIndex(requestOptions.sort)
    .search<CultureKingsAlgoliaHits>('', {
      hitsPerPage: requestOptions.limit,
      page: requestOptions.page - 1,
      ruleContexts: [`collection-${category.uri}`],
      filters: `${CULTURE_KINGS_ALGOLIA_FILTERS}${category.uri}`,
      headers: CULTURE_KINGS_ALGOLIA_HEADERS,
    })
    .then((res) => mapProductValues(res.hits));

const mapProductValues = (hits: Array<CultureKingsAlgoliaHits>): ClotheItem[] =>
  hits.map((product) => ({
    name: product.title,
    discountedPrice: product.compareAtPrice ? product.price : undefined,
    price: product.compareAtPrice ? product.compareAtPrice : product.price,
    link: `${CULTURE_KINGS_URL}/products/${product.handle}?productId=${product.openstyleStyleCode}&gender=${product.gender}`,
    image: product.image,
    productId: product.openstyleStyleCode,
    website: 'Culture Kings',
  }));
