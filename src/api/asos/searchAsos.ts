import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { makeAsosSearchUrl } from './constants';
import { requestClothesAsos } from './requestClothesAsos';

export async function searchAsos(
  query: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> {
  const cacheKey = `asos-search-${query}`;

  return await requestClothesAsos(
    cacheKey,
    query,
    requestOptions,
    makeAsosSearchUrl
  );
}
