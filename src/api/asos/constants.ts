import { GetClothesOptions } from '../getClothes';

export const ASOS_BASE_URL = 'https://www.asos.com/au';

export const ASOS_BASE_API_URL =
  'https://www.asos.com/api/product/search/v2/categories/';

const makeAsosApiQueryString = (requestOptions: GetClothesOptions) => {
  const { page, limit } = requestOptions;
  const offSet = page === 1 ? 1 : page * limit;
  return `?channel=desktop-web&country=AU&currency=AUD&lang=en-AU&offset=${offSet}&store=AU&limit=${limit}`;
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
  .set('3006', { uri: '8799' });
