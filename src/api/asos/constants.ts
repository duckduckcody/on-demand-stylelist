import { ClotheSortOption } from '../../constants';
import { GetClothesOptions } from '../getClothes';

export const ASOS_BASE_URL = 'https://www.asos.com/au';

export const ASOS_BASE_API_URL =
  'https://www.asos.com/api/product/search/v2/categories/';

export const ASOS_HEADERS = {
  'asos-c-name': 'asos-web-product-listing-page',
  'asos-c-plat': 'web',
  Accept: '*/*',
  Host: 'www.asos.com',
  Pragma: 'no-cache',
  TE: 'Trailers',
  Referer: ASOS_BASE_URL,
};

export const sortToApiQueryValueMap = new Map<ClotheSortOption, string>()
  .set(ClotheSortOption.BEST_SELLING, '')
  .set(ClotheSortOption.NEWEST, 'freshness')
  .set(ClotheSortOption.PRICE_HIGH_TO_LOW, 'pricedesc')
  .set(ClotheSortOption.PRICE_LOW_TO_HIGH, 'priceasc');

const makeAsosApiQueryString = (requestOptions: GetClothesOptions) => {
  const { page, limit } = requestOptions;
  const offSet = page === 1 ? 1 : page * limit;
  const sort = sortToApiQueryValueMap.get(requestOptions.sort);
  return `?channel=desktop-web&country=AU&currency=AUD&lang=en-AU&store=AU&offset=${offSet}&limit=${limit}${
    sort ? `&sort=${sort}` : ''
  }`;
};

export const makeAsosApiUrl = (
  uri: string,
  requestOptions: GetClothesOptions
): string =>
  `${ASOS_BASE_API_URL}${uri}${makeAsosApiQueryString(requestOptions)}`;

interface CidMapValue {
  uri: string;
}

export const asosCidMap = new Map<string, CidMapValue>()
  .set('3000', { uri: '5668' })
  .set('3001', { uri: '3606' })
  .set('3002', { uri: '7617' })
  .set('3003', { uri: '7078' })
  .set('3004', { uri: '7616' })
  .set('3005', { uri: '2639' })
  .set('3006', { uri: '8799' })
  .set('3007', { uri: '5774' })
  .set('3008', { uri: '5775' });
