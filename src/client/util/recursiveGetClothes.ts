import { ClotheItem } from '../../types/ClotheItem';

export const recursiveGetClothes = async <T>(
  clothes: Partial<ClotheItem>[],
  key: string,
  requestOptions: T,
  makeUrlFunction: (key: string, requestOptions: T) => string,
  requestData: (
    key: string,
    requestOptions: T,
    makeUrlFunction: (key: string, requestOptions: T) => string
  ) => Promise<Partial<ClotheItem>[]>,
  numberOfClothesReturnedByRequest: number,
  numberOfClothesNeeded: number
): Promise<Partial<ClotheItem>[]> => {
  if (clothes.length > 0 && clothes.length < numberOfClothesReturnedByRequest)
    return clothes;

  if (numberOfClothesNeeded <= clothes.length) {
    return clothes;
  }

  // clothes.length / numberOfClothesReturnedByRequest is current page. + 1 for next page.
  const nextPage =
    Math.trunc(clothes.length / numberOfClothesReturnedByRequest) + 1;

  const nextPageData = await requestData(
    key,
    {
      ...requestOptions,
      limit: numberOfClothesReturnedByRequest,
      page: nextPage,
    },
    makeUrlFunction
  );

  if (nextPageData.length < numberOfClothesReturnedByRequest)
    return clothes.concat(nextPageData);

  return await recursiveGetClothes(
    clothes.concat(nextPageData),
    key,
    requestOptions,
    makeUrlFunction,
    requestData,
    numberOfClothesReturnedByRequest,
    numberOfClothesNeeded
  );
};
