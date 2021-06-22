import { Promise } from 'bluebird';
import { recursiveGetClothes } from '../../client/util/recursiveGetClothes';
import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { clothesCache } from '../cache';
import {
  CultureKingsAlgoliaHits,
  CULTURE_KINGS_ALGOLIA_HEADERS,
  defaultCultureKingsAlgoliaIndex,
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

  const clothes = await recursiveGetClothes(
    cachedClothes,
    cultureKingsCid.uri,
    requestOptions,
    () => '',
    requestData,
    CULTURE_KINGS_LIMIT,
    lastIndex
  );

  clothesCache.set(cacheKey, clothes);

  return clothes.slice(firstIndex, lastIndex);
};

const requestData = async (
  key: string,
  requestOptions: GetClothesOptions
): Promise<ClotheItem[]> => {
  const index = requestOptions.sort 
    ? getCultureKingsAlgoliaIndex(requestOptions.sort) 
  :   defaultCultureKingsAlgoliaIndex
 
  const res = await index.search<CultureKingsAlgoliaHits>('', {
    hitsPerPage: requestOptions.limit,
    page: requestOptions.page - 1,
    ruleContexts: [`collection-${key}`],
    filters: `${CULTURE_KINGS_ALGOLIA_FILTERS}${key}`,
    headers: CULTURE_KINGS_ALGOLIA_HEADERS,
  });
  return mapProductValues(res.hits);
}


const mapProductValues = (hits: Array<CultureKingsAlgoliaHits>): ClotheItem[] =>
  hits.map((product) => ({
    name: product.title,
    discountedPrice: product.compareAtPrice ? product.price : undefined,
    price: product.compareAtPrice ? product.compareAtPrice : product.price,
    link: `${CULTURE_KINGS_URL}/products/${product.handle}?productId=${product.styleGroup}&gender=${product.gender}`,
    image: product.image,
    productId: product.styleGroup,
    website: 'Culture Kings',
  }));
