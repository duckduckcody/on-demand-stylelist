import { ClotheSortOption } from '../../constants';
import { GetClothesOptions } from '../getClothes';

export const ASOS_BASE_URL = 'https://www.asos.com/au';

export const ASOS_IMAGE_URL = 'https://images.asos-media.com/products/image';

export const ASOS_IMAGE_URL_QUERY_PARAMS = '-3?$XL$&wid=500&fit=constrain';

export const ASOS_LIMIT = 72;

export const sortToApiQueryValueMap = new Map<ClotheSortOption, string>()
  .set(ClotheSortOption.BEST_SELLING, '')
  .set(ClotheSortOption.NEWEST, 'freshness')
  .set(ClotheSortOption.PRICE_HIGH_TO_LOW, 'pricedesc')
  .set(ClotheSortOption.PRICE_LOW_TO_HIGH, 'priceasc');

const makeQueryString = (requestOptions: GetClothesOptions) => {
  const { page, limit } = requestOptions;
  const sort = sortToApiQueryValueMap.get(requestOptions.sort);
  return `&page=${page}&limit=${limit}${sort ? `&sort=${sort}` : ''}`;
};

export const makeAsosApiUrl = (
  uri: string,
  requestOptions: GetClothesOptions
): string => `${ASOS_BASE_URL}${uri}${makeQueryString(requestOptions)}`;

interface CidMapValue {
  uri: string;
}

export const makeImageUrl = (id: string | null | undefined): string | null => {
  if (!id) return null;
  return `${ASOS_IMAGE_URL}/${id}${ASOS_IMAGE_URL_QUERY_PARAMS}`;
};

export const asosCidMap = new Map<string, CidMapValue>()
  .set('3000', { uri: '/men/cat/?cid=5668' })
  .set('3001', { uri: '/men/cat/?cid=3606' })
  .set('3002', { uri: '/men/cat/?cid=7617' })
  .set('3003', { uri: '/men/cat/?cid=7078' })
  .set('3004', { uri: '/men/cat/?cid=7616' })
  .set('3005', { uri: '/women/cat/?cid=2639' })
  .set('3006', { uri: '/women/cat/?cid=8799' })
  .set('3007', { uri: '/men/cat/?cid=5774' })
  .set('3008', { uri: '/men/cat/?cid=5775' });
