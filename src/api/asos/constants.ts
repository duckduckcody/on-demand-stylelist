import {
  CategoryName,
  ClotheSortOption,
  Gender,
  getCategoryId,
} from '../../constants';
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
  const { page, sort } = requestOptions;
  const sortQueryValue = sortToApiQueryValueMap.get(sort);
  return `&page=${page}${sortQueryValue ? `&sort=${sortQueryValue}` : ''}`;
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

export const asosCidMap = new Map<number, CidMapValue>()
  .set(getCategoryId(CategoryName.SHIRTS, Gender.MEN), {
    uri: '/men/cat/?cid=3602',
  })
  .set(getCategoryId(CategoryName.JUMPERS, Gender.MEN), {
    uri: '/men/cat/?cid=7617',
  })
  .set(getCategoryId(CategoryName.HOODIES, Gender.MEN), {
    uri: '/men/cat/?cid=5668',
  })
  .set(getCategoryId(CategoryName.JACKETS, Gender.MEN), {
    uri: '/men/cat/?cid=3606',
  })
  .set(getCategoryId(CategoryName.SHORTS, Gender.MEN), {
    uri: '/men/cat/?cid=7078',
  })
  .set(getCategoryId(CategoryName.JEANS, Gender.MEN), {
    uri: '/men/cat/?cid=4208',
  })
  .set(getCategoryId(CategoryName.SHOES, Gender.MEN), {
    uri: '/men/cat/?cid=5775',
  })
  .set(getCategoryId(CategoryName.BOOTS, Gender.MEN), {
    uri: '/men/cat/?cid=5774',
  })
  .set(getCategoryId(CategoryName.SKIRTS, Gender.WOMEN), {
    uri: '/men/cat/?cid=2639',
  })
  .set(getCategoryId(CategoryName.DRESSES, Gender.WOMEN), {
    uri: '/men/cat/?cid=8799',
  });
