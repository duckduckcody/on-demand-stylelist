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

  // clothes.length / numberOfClothesReturnedByRequest is current page. + 1 for next page.
  const nextPage =
    Math.trunc(clothes.length / numberOfClothesReturnedByRequest) + 1;

  const nextPageData = await requestData(uri, {
    sort: requestOptions.sort,
    limit: numberOfClothesReturnedByRequest,
    page: nextPage,
  });

  if (nextPageData.length < numberOfClothesReturnedByRequest)
    return clothes.concat(nextPageData);

  return await recursiveGetClothes(
    requestOptions,
    clothes.concat(nextPageData),
    uri,
    requestData,
    numberOfClothesReturnedByRequest,
    numberOfClothesNeeded
  );
};
