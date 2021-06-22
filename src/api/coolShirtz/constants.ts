import { CategoryName, getCategoryId } from '../../categories';
import { ClotheSortOption } from '../../types/ClotheSort';
import { Gender } from '../../types/Gender';
import { GetClothesOptions } from '../../types/GetClothesOptions';

export const COOL_SHIRTZ_BASE_URL = 'https://shirtz.cool';

export const COOL_SHIRTZ_LOGO = 'https://i.imgur.com/Baq9ezR.png';

export const SORT_QUERY_STRING_KEY = 'sort_by';

export const COOL_SHIRTZ_SEARCH_LIMIT = 20;

interface CidMapValue {
  uri: string;
}

export const coolShirtzCidMap = new Map<number, CidMapValue>()
  .set(getCategoryId(CategoryName.SHIRTS, Gender.MEN), { uri: 'basic-tees' })
  .set(getCategoryId(CategoryName.HOODIES, Gender.MEN), { uri: 'jumpers' })
  .set(getCategoryId(CategoryName.JACKETS, Gender.MEN), { uri: 'jackets' })
  .set(getCategoryId(CategoryName.TRACK_PANTS, Gender.MEN), { uri: 'pants-1' })
  .set(getCategoryId(CategoryName.TRACK_PANTS, Gender.WOMEN), {
    uri: 'pants-1',
  });

export const sortToQueryStringValueMap = new Map<ClotheSortOption, string>()
  .set(ClotheSortOption.BEST_SELLING, 'best-selling')
  .set(ClotheSortOption.NEWEST, 'created-descending')
  .set(ClotheSortOption.PRICE_HIGH_TO_LOW, 'price-descending')
  .set(ClotheSortOption.PRICE_LOW_TO_HIGH, 'price-ascending');

export const makeCoolShirtzUrl = (
  uri: string,
  requestOptions: GetClothesOptions
): string => {
  const sortQueryString = requestOptions.sort 
    ? `?${SORT_QUERY_STRING_KEY}=${sortToQueryStringValueMap.get(requestOptions.sort)}` 
    : undefined

  return `${COOL_SHIRTZ_BASE_URL}/collections/${uri}${sortQueryString ? sortQueryString : ''}`;
}

export const makeCoolShirtzSearchUrl = (
  query: string,
  requestOptions: GetClothesOptions
): string =>
  `https://shirtz.cool/search?type=product&q=${query}&page=${requestOptions.page}`;
