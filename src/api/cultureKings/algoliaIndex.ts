import algoliasearch, { SearchIndex } from 'algoliasearch';
import { ClotheSortOption } from '../../constants';
import {
  CultureKingsIndexName,
  CULTURE_KINGS_ALGOLIA_API_KEY,
  CULTURE_KINGS_ALGOLIA_APP_ID,
} from './constants';

const client = algoliasearch(
  CULTURE_KINGS_ALGOLIA_APP_ID,
  CULTURE_KINGS_ALGOLIA_API_KEY
);

const defaultCultureKingsAlgoliaIndex = client.initIndex(
  CultureKingsIndexName.NEWEST
);

const cultureKingsAlgoliaIndexMap = new Map<ClotheSortOption, SearchIndex>()
  .set(ClotheSortOption.NEWEST, defaultCultureKingsAlgoliaIndex)
  .set(
    ClotheSortOption.PRICE_HIGH_TO_LOW,
    client.initIndex(CultureKingsIndexName.PRICE_HIGH_TO_LOW)
  )
  .set(
    ClotheSortOption.PRICE_LOW_TO_HIGH,
    client.initIndex(CultureKingsIndexName.PRICE_LOW_TO_HIGH)
  )
  .set(
    ClotheSortOption.BEST_SELLING,
    client.initIndex(CultureKingsIndexName.BEST_SELLING)
  );

export const getCultureKingsAlgoliaIndex = (
  sort: ClotheSortOption
): SearchIndex => {
  const index = cultureKingsAlgoliaIndexMap.get(sort);
  if (!index) return defaultCultureKingsAlgoliaIndex;
  return index;
};
