export const CULTURE_KINGS_URL = 'https://www.culturekings.com.au';
export const CULTURE_KINGS_ALGOLIA_APP_ID = '22MG8HZKHO';
export const CULTURE_KINGS_ALGOLIA_API_KEY = '120a2dd1a67e962183768696b750a52c';
export const CULTURE_KINGS_ALGOLIA_INDEX_NAME =
  'shopify_production_products_default';
export const CULTURE_KINGS_ALGOLIA_FILTERS =
  '(inStock:true OR isForcedSoldOut:1 OR isStayInCollection:1) AND isOnline:true AND collectionHandles:';

interface CidMapValue {
  uri: string;
}

export const cultureKingsCidMap = new Map<string, CidMapValue>()
  .set('3000', { uri: 'mens-tops-hood' })
  .set('3001', { uri: 'mens-tops-outer-wear' })
  .set('3002', { uri: 'mens-tops-crewneck' })
  .set('3003', { uri: 'mens-bottoms-shorts' })
  .set('3004', { uri: 'mens-tops-ss-tees' })
  .set('3005', { uri: 'womens-bottoms-skirt' })
  .set('3006', { uri: 'womens-tops-dress' });
