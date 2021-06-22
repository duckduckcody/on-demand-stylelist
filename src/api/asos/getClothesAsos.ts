import { Promise } from 'bluebird';
import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';
import { getAsosCategoryByCategoryId, makeAsosUrl } from './constants';
import { requestClothesAsos } from './requestClothesAsos';

export async function getClothesAsos(
  cid: string,
  requestOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> {
  const asosCategory = getAsosCategoryByCategoryId(parseInt(cid));
  if (!asosCategory) return Promise.resolve([]);

  const cacheKey = `asos-${asosCategory.uri}-${requestOptions.sort}`;

  return await requestClothesAsos(
    cacheKey,
    asosCategory.uri,
    requestOptions,
    makeAsosUrl
  );
}
