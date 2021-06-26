import { CategoryName, getCategoryId } from '../../categories';
import { ClotheSortOption } from '../../types/ClotheSort';
import { Gender } from '../../types/Gender';
import { GetClothesOptions } from '../../types/GetClothesOptions';

export const UNIVERSAL_STORE_BASE_URL = 'https://www.universalstore.com';

export const UNIVERSAL_STORE_LOGO =
  'https://www.universalstore.com/static/version1624394318/frontend/universalstore/universalstore/en_AU/images/logo.png';

export const SORT_QUERY_STRING_KEY = 'product_list_order';

const PAGE_KEY = 'p';

export const UNIVERSAL_STORE_LIMIT = 30;

export const universalStoreCidMap = new Map<number, string>()
  .set(getCategoryId(CategoryName.SHIRTS, Gender.MEN), '/mens/t-shirts')
  .set(
    getCategoryId(CategoryName.JUMPERS, Gender.MEN),
    '/mens/hoodies-sweaters'
  )
  .set(
    getCategoryId(CategoryName.HOODIES, Gender.MEN),
    '/mens/hoodies-sweaters'
  )
  .set(getCategoryId(CategoryName.JACKETS, Gender.MEN), '/mens/jackets-coats')
  .set(getCategoryId(CategoryName.SHORTS, Gender.MEN), '/mens/shorts')
  .set(getCategoryId(CategoryName.JEANS, Gender.MEN), '/mens/jeans')
  .set(getCategoryId(CategoryName.TRACK_PANTS, Gender.MEN), '/mens/pants')
  .set(getCategoryId(CategoryName.SHOES, Gender.MEN), '/mens/shoes/sneakers')
  .set(getCategoryId(CategoryName.BOOTS, Gender.MEN), '/mens/shoes/boots')
  .set(getCategoryId(CategoryName.SKIRTS, Gender.WOMEN), '/womens/skirts')
  .set(getCategoryId(CategoryName.DRESSES, Gender.WOMEN), '/womens/dresses')
  .set(getCategoryId(CategoryName.TRACK_PANTS, Gender.WOMEN), '/womens/pants');

export const sortToQueryStringValueMap = new Map<ClotheSortOption, string>()
  .set(ClotheSortOption.BEST_SELLING, 'popularity_order')
  .set(ClotheSortOption.NEWEST, '')
  .set(ClotheSortOption.PRICE_HIGH_TO_LOW, 'high_to_low')
  .set(ClotheSortOption.PRICE_LOW_TO_HIGH, 'low_to_high');

export const makeUniversalStoreListUrl = (
  uri: string,
  requestOptions: GetClothesOptions
): string => {
  const url = `${UNIVERSAL_STORE_BASE_URL}${uri}.html?${PAGE_KEY}=${requestOptions.page}`;

  if (requestOptions.sort) {
    const sortQueryValue = sortToQueryStringValueMap.get(requestOptions.sort);
    const sortQueryString = sortQueryValue
      ? `${SORT_QUERY_STRING_KEY}=${sortQueryValue}`
      : undefined;
    if (sortQueryString) return `${url}&${sortQueryString}`;
  }

  return url;
};

export const makeUniversalStoreSearchUrl = (
  query: string,
  requestOptions: GetClothesOptions
): string =>
  `${UNIVERSAL_STORE_BASE_URL}/catalogsearch/result/?q=${query}&p=${requestOptions.page}`;
