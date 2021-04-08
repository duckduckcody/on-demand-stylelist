import { ClotheSortOption } from '../../constants';
import { GetClothesOptions } from '../getClothes';

export const COOL_SHIRTZ_BASE_URL = 'https://shirtz.cool';

export const SORT_QUERY_STRING_KEY = 'sort_by';

interface CidMapValue {
  uri: string;
}

export const coolShirtzCidMap = new Map<string, CidMapValue>()
  .set('3000', { uri: 'jumpers' })
  .set('3001', { uri: 'jackets' })
  .set('3002', { uri: 'jumpers' })
  .set('3003', { uri: 'pants-1' })
  .set('3004', { uri: 'basic-tees' })
  .set('3006', { uri: 'crop-tops' });

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
