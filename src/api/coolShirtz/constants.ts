import { CategoryName, getCategoryId } from '../../categories';
import { ClotheSortOption, Gender } from '../../constants';
import { GetClothesOptions } from '../getClothes';

export const COOL_SHIRTZ_BASE_URL = 'https://shirtz.cool';

export const SORT_QUERY_STRING_KEY = 'sort_by';

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
): string =>
  `${COOL_SHIRTZ_BASE_URL}/collections/${uri}?${SORT_QUERY_STRING_KEY}=${sortToQueryStringValueMap.get(
    requestOptions.sort
  )}`;
