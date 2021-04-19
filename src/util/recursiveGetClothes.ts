import { getClothesFunction } from '../api/constants';
import { ClotheItem, GetClothesOptions } from '../api/getClothes';

const RECURSE_LIMIT = 4;

export const recursiveGetClothes = async (
  requestOptions: GetClothesOptions,
  clothes: Partial<ClotheItem>[],
  uri: string,
  requestData: getClothesFunction,
  requestLimit: number,
  numberOfRecursions = 1
): Promise<Partial<ClotheItem>[]> => {
  const clothesNeeded = requestOptions.page * requestOptions.limit;
  if (clothesNeeded <= clothes.length || numberOfRecursions === RECURSE_LIMIT) {
    return clothes;
  }

  const nextPage = clothes.length === 0 ? 1 : clothes.length / requestLimit;

  console.log('requesting next page of data');
  const nextPageData = await requestData(uri, {
    sort: requestOptions.sort,
    limit: requestLimit,
    page: nextPage,
  });

  return await recursiveGetClothes(
    requestOptions,
    clothes.concat(nextPageData),
    uri,
    requestData,
    requestLimit,
    numberOfRecursions + 1
  );
};
