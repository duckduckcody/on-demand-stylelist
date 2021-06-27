import algoliasearch, { SearchIndex } from 'algoliasearch';
import { ClotheSortOption } from '../../types/ClotheSort';
import { HEADERS } from '../constants';
import {
  CultureKingsIndexName,
  CULTURE_KINGS_ALGOLIA_API_KEY,
  CULTURE_KINGS_ALGOLIA_APP_ID,
  CULTURE_KINGS_URL,
} from './constants';

export interface CultureKingsAlgoliaHits {
  title: string;
  price: number;
  compareAtPrice: number;
  handle: string;
  image: string;
  openstyleStyleCode: string;
  gender: string;
  description: string;
  images: string[];
  styleGroup: string;
}

export const CULTURE_KINGS_ALGOLIA_HEADERS = {
  Referer: CULTURE_KINGS_URL.replace('https://', 'https://www.'),
  ...HEADERS,
};

const client = algoliasearch(
  CULTURE_KINGS_ALGOLIA_APP_ID,
  CULTURE_KINGS_ALGOLIA_API_KEY
);

export const clotheInfoCultureKingsAlgoliaIndex = client.initIndex(
  CultureKingsIndexName.CLOTHE_INFO
);

export const defaultCultureKingsAlgoliaIndex = client.initIndex(
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
