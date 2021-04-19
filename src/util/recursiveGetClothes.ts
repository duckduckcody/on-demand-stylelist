import { getClothesFunction } from '../api/constants';
import { ClotheItem, GetClothesOptions } from '../api/getClothes';

export const recursiveGetClothes = async (
  requestOptions: GetClothesOptions,
  clothes: Partial<ClotheItem>[],
  uri: string,
  requestData: getClothesFunction,
  numberOfClothesReturnedByRequest: number,
  numberOfClothesNeeded: number
): Promise<Partial<ClotheItem>[]> => {
  if (numberOfClothesNeeded <= clothes.length) {
    return clothes;
  }

  const nextPage =
    clothes.length === 0
      ? 1
      : clothes.length / numberOfClothesReturnedByRequest;

  const nextPageData = await requestData(uri, {
    sort: requestOptions.sort,
    limit: numberOfClothesReturnedByRequest,
    page: nextPage,
  });

  return await recursiveGetClothes(
    requestOptions,
    clothes.concat(nextPageData),
    uri,
    requestData,
    numberOfClothesReturnedByRequest,
    numberOfClothesNeeded
  );
};
