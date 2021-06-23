import { recursiveGetClothes } from '../../client/util/recursiveGetClothes';
import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { clothesCache } from '../cache';
import { CultureKingsAlgoliaHits } from './algoliaIndex';
import { CULTURE_KINGS_LIMIT, CULTURE_KINGS_URL } from './constants';

export const requestClothesCultureKings = async (
  key: string,
  cacheKey: string,
  requestOptions: GetClothesOptions,
  requestData: (
    key: string,
    requestOptions: GetClothesOptions
  ) => Promise<Partial<ClotheItem>[]>
): Promise<Partial<ClotheItem>[]> => {
  const lastIndex = requestOptions.page * requestOptions.limit;
  const firstIndex = lastIndex - requestOptions.limit;

  const cachedClothes: Partial<ClotheItem>[] = clothesCache.get(cacheKey) || [];

  const clothes = await recursiveGetClothes(
    cachedClothes,
    key,
    requestOptions,
    () => '',
    requestData,
    CULTURE_KINGS_LIMIT,
    lastIndex
  );

  clothesCache.set(cacheKey, clothes);

  return clothes.slice(firstIndex, lastIndex);
};

export const mapCultureKingsProductValues = (
  hits: Array<CultureKingsAlgoliaHits>
): ClotheItem[] =>
  hits.map((product) => ({
    name: product.title,
    discountedPrice: product.compareAtPrice ? product.price : undefined,
    price: product.compareAtPrice ? product.compareAtPrice : product.price,
    link: `${CULTURE_KINGS_URL}/products/${product.handle}?productId=${product.styleGroup}&gender=${product.gender}`,
    image: product.image,
    productId: product.styleGroup,
    website: 'Culture Kings',
  }));
