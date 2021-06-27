import { Promise } from 'bluebird';
import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { requestClothes } from '../common/requestClothes';
import {
  CultureKingsAlgoliaHits,
  CULTURE_KINGS_ALGOLIA_HEADERS,
  defaultCultureKingsAlgoliaIndex,
  getCultureKingsAlgoliaIndex,
} from './algoliaIndex';
import {
  cultureKingsCidMap,
  CULTURE_KINGS_ALGOLIA_LIST_FILTERS,
  CULTURE_KINGS_LIMIT,
} from './constants';
import { mapCultureKingsProductValues } from './mapCultureKingsProductValues';

export const getClothesCultureKings = async (
  cid: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> => {
  const cultureKingsCid = cultureKingsCidMap.get(parseInt(cid));
  if (!cultureKingsCid) return Promise.resolve([]);

  const cacheKey = `culture-kings-${cultureKingsCid!.uri}-${
    requestOptions.sort
  }`;

  return await requestClothes(
    cultureKingsCid.uri,
    cacheKey,
    CULTURE_KINGS_LIMIT,
    requestOptions,
    requestData
  );
};

const requestData = async (
  key: string,
  requestOptions: GetClothesOptions
): Promise<ClotheItem[]> => {
  const index = requestOptions.sort
    ? getCultureKingsAlgoliaIndex(requestOptions.sort)
    : defaultCultureKingsAlgoliaIndex;

  return await index
    .search<CultureKingsAlgoliaHits>('', {
      hitsPerPage: requestOptions.limit,
      page: requestOptions.page - 1,
      ruleContexts: [`collection-${key}`],
      filters: `${CULTURE_KINGS_ALGOLIA_LIST_FILTERS}${key}`,
      headers: CULTURE_KINGS_ALGOLIA_HEADERS,
      enableRules: requestOptions.sort === 'bestSelling',
    })
    .then((res) => mapCultureKingsProductValues(res.hits))
    .catch((e) => {
      console.error('Error scraping Culture kings', e);
      return Promise.resolve([]);
    });
};
