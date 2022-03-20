import { CategoryName, getCategoryId } from '../../categories';
import { Gender } from '../../types/Gender';

export const CULTURE_KINGS_LOGO =
  'https://cdn.shopify.com/s/files/1/1023/3455/t/11/assets/culture-kings-logo.svg?v=9025665209038806776';
export const CULTURE_KINGS_FAVICON = `https://cdn.shopify.com/s/files/1/1023/3455/t/11/assets/apple-touch-icon.png?v=756306045569309977`;
export const CULTURE_KINGS_URL = 'https://culturekings.com.au';
export const CULTURE_KINGS_ALGOLIA_APP_ID = '22MG8HZKHO';
export const CULTURE_KINGS_ALGOLIA_API_KEY = '120a2dd1a67e962183768696b750a52c';
export const CULTURE_KINGS_ALGOLIA_FILTERS =
  '(inStock:true OR isForcedSoldOut:1 OR isStayInCollection:1) AND isOnline:true';
export const CULTURE_KINGS_ALGOLIA_LIST_FILTERS = `${CULTURE_KINGS_ALGOLIA_FILTERS} AND collectionHandles:`;

export const CULTURE_KINGS_LIMIT = 80;

export enum CultureKingsIndexName {
  PRICE_HIGH_TO_LOW = 'shopify_production_products_price_desc',
  PRICE_LOW_TO_HIGH = 'shopify_production_products_price_asc',
  BEST_SELLING = 'shopify_production_products_default',
  NEWEST = 'shopify_production_products_published_at_desc',
  CLOTHE_INFO = 'shopify_production_products_colorway',
}

interface CidMapValue {
  uri: string;
}

export const cultureKingsCidMap = new Map<number, CidMapValue>()
  .set(getCategoryId(CategoryName.HOODIES, Gender.MEN), {
    uri: 'mens-tops-hood',
  })
  .set(getCategoryId(CategoryName.JACKETS, Gender.MEN), {
    uri: 'mens-tops-outer-wear',
  })
  .set(getCategoryId(CategoryName.JUMPERS, Gender.MEN), {
    uri: 'mens-tops-crewneck',
  })
  .set(getCategoryId(CategoryName.SHORTS, Gender.MEN), {
    uri: 'mens-bottoms-shorts',
  })
  .set(getCategoryId(CategoryName.JEANS, Gender.MEN), {
    uri: 'mens-bottoms-jeans',
  })
  .set(getCategoryId(CategoryName.SHIRTS, Gender.MEN), {
    uri: 'mens-tops-ss-tees',
  })
  .set(getCategoryId(CategoryName.TRACK_PANTS, Gender.MEN), {
    uri: 'mens-bottoms-track-pants',
  })
  .set(getCategoryId(CategoryName.SHOES, Gender.MEN), { uri: 'mens-footwear' })
  .set(getCategoryId(CategoryName.BOOTS, Gender.MEN), { uri: 'mens-boots' })
  // .set(getCategoryId(CategoryName.SALE, Gender.MEN), {
  //   uri: 'mens-back-catalogue',
  // })
  .set(getCategoryId(CategoryName.SKIRTS, Gender.WOMEN), {
    uri: 'womens-bottoms-skirt',
  })
  .set(getCategoryId(CategoryName.DRESSES, Gender.WOMEN), {
    uri: 'womens-tops-dress',
  })
  .set(getCategoryId(CategoryName.TRACK_PANTS, Gender.WOMEN), {
    uri: 'womens-bottoms-pants',
  })
  .set(getCategoryId(CategoryName.SALE, Gender.WOMEN), {
    uri: 'womens-back-catalogue',
  });
