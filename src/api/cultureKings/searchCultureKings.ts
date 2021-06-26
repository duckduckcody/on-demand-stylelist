import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { requestClothes } from '../common/requestClothes';
import {
  CultureKingsAlgoliaHits,
  CULTURE_KINGS_ALGOLIA_HEADERS,
  defaultCultureKingsAlgoliaIndex,
} from './algoliaIndex';
import {
  CULTURE_KINGS_ALGOLIA_FILTERS,
  CULTURE_KINGS_LIMIT,
} from './constants';
import { mapCultureKingsProductValues } from './mapCultureKingsProductValues';

export const searchCultureKings = async (
  query: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const cacheKey = `culture-kings-search-${query}`;

  return await requestClothes(
    query,
    cacheKey,
    CULTURE_KINGS_LIMIT,
    requestOptions,
    requestData
  );
};

const requestData = async (
  query: string,
  requestOptions: GetClothesOptions
): Promise<ClotheItem[]> => {
  const res =
    await defaultCultureKingsAlgoliaIndex.search<CultureKingsAlgoliaHits>(
      query,
      {
        hitsPerPage: requestOptions.limit,
        page: requestOptions.page - 1,
        filters: `${CULTURE_KINGS_ALGOLIA_FILTERS}`,
        headers: CULTURE_KINGS_ALGOLIA_HEADERS,
      }
    );
  return mapCultureKingsProductValues(res.hits);
};
