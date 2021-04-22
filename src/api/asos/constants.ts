import {
  CategoryName,
  ClotheSortOption,
  Gender,
  getCategoryId,
} from '../../constants';
import { GetClothesOptions } from '../getClothes';

export const ASOS_LIMIT = 72;

export const ASOS_BASE_URL = 'https://www.asos.com/au';

export const ASOS_IMAGE_URL_PRODUCTS =
  'https://images.asos-media.com/products/image/';

export const ASOS_IMAGE_URL_PRODUCTS_QUERY_PARAMS =
  '-3?$XXL$&wid=500&fit=constrain';

export const ASOS_IMAGE_URL_GROUPS =
  'https://images.asos-media.com/groups/image/';

export const ASOS_IMAGE_URL_GROUPS_QUERY_PARAMS =
  '-group-1?$n_640w$&wid=513&fit=constrain';

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

export const makeAsosUrl = (
  uri: string,
  requestOptions: GetClothesOptions
): string => `${ASOS_BASE_URL}${uri}${makeQueryString(requestOptions)}`;

type ImageUrlStyle = 'products' | 'groups';
export const makeImageUrl = (
  id: string | null | undefined,
  imageUrlStyle: string
): string | null => {
  if (!id) return null;
  const url =
    imageUrlStyle === 'products'
      ? ASOS_IMAGE_URL_PRODUCTS
      : ASOS_IMAGE_URL_GROUPS;
  const params =
    imageUrlStyle === 'products'
      ? ASOS_IMAGE_URL_PRODUCTS_QUERY_PARAMS
      : ASOS_IMAGE_URL_GROUPS_QUERY_PARAMS;
  return `${url}${id}${params}`;
};

export interface AsosCategory {
  categoryName: CategoryName;
  gender: Gender;
  uri: string;
  imageUrlStyle: ImageUrlStyle;
  categoryId: number;
}

export const getAsosCategoryByCategoryId = (
  categoryId: number
): AsosCategory | undefined =>
  asosCategory.find((cat) => cat.categoryId === categoryId);

export const asosCategory: AsosCategory[] = [
  {
    categoryName: CategoryName.SHIRTS,
    gender: Gender.MEN,
    uri: '/men/cat/?cid=3602',
    imageUrlStyle: 'products',
    get categoryId(): number {
      return getCategoryId(this.categoryName, this.gender);
    },
  },
  {
    categoryName: CategoryName.JUMPERS,
    gender: Gender.MEN,
    uri: '/men/cat/?cid=7617',
    imageUrlStyle: 'products',
    get categoryId(): number {
      return getCategoryId(this.categoryName, this.gender);
    },
  },
  {
    categoryName: CategoryName.HOODIES,
    gender: Gender.MEN,
    uri: '/men/cat/?cid=5668',
    imageUrlStyle: 'products',
    get categoryId(): number {
      return getCategoryId(this.categoryName, this.gender);
    },
  },
  {
    categoryName: CategoryName.JACKETS,
    gender: Gender.MEN,
    uri: '/men/cat/?cid=3606',
    imageUrlStyle: 'products',
    get categoryId(): number {
      return getCategoryId(this.categoryName, this.gender);
    },
  },
  {
    categoryName: CategoryName.SHORTS,
    gender: Gender.MEN,
    uri: '/men/cat/?cid=7078',
    imageUrlStyle: 'products',
    get categoryId(): number {
      return getCategoryId(this.categoryName, this.gender);
    },
  },
  {
    categoryName: CategoryName.JEANS,
    gender: Gender.MEN,
    uri: '/men/cat/?cid=4208',
    imageUrlStyle: 'products',
    get categoryId(): number {
      return getCategoryId(this.categoryName, this.gender);
    },
  },
  {
    categoryName: CategoryName.TRACK_PANTS,
    gender: Gender.MEN,
    uri: '/men/cat/?cid=26776',
    imageUrlStyle: 'groups',
    get categoryId(): number {
      return getCategoryId(this.categoryName, this.gender);
    },
  },
  {
    categoryName: CategoryName.SHOES,
    gender: Gender.MEN,
    uri: '/men/cat/?cid=5775',
    imageUrlStyle: 'products',
    get categoryId(): number {
      return getCategoryId(this.categoryName, this.gender);
    },
  },
  {
    categoryName: CategoryName.BOOTS,
    gender: Gender.MEN,
    uri: '/men/cat/?cid=5774',
    imageUrlStyle: 'products',
    get categoryId(): number {
      return getCategoryId(this.categoryName, this.gender);
    },
  },
  {
    categoryName: CategoryName.SKIRTS,
    gender: Gender.WOMEN,
    uri: '/women/cat/?cid=2639',
    imageUrlStyle: 'products',
    get categoryId(): number {
      return getCategoryId(this.categoryName, this.gender);
    },
  },
  {
    categoryName: CategoryName.DRESSES,
    gender: Gender.WOMEN,
    uri: '/women/cat/?cid=8799',
    imageUrlStyle: 'products',
    get categoryId(): number {
      return getCategoryId(this.categoryName, this.gender);
    },
  },
  {
    categoryName: CategoryName.TRACK_PANTS,
    gender: Gender.WOMEN,
    uri: '/women/cat/?cid=27953',
    imageUrlStyle: 'products',
    get categoryId(): number {
      return getCategoryId(this.categoryName, this.gender);
    },
  },
];
