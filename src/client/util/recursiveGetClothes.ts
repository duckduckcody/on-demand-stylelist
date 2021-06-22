import { ClotheItem } from '../../types/ClotheItem';

export const recursiveGetClothes = async <T>(
  clothes: Partial<ClotheItem>[],
  key: string,
  requestOptions: T,
  requestData: (
    key: string,
    requestOptions: T
  ) => Promise<Partial<ClotheItem>[]>,
  numberOfClothesReturnedByRequest: number,
  numberOfClothesNeeded: number
): Promise<Partial<ClotheItem>[]> => {
  if (numberOfClothesNeeded <= clothes.length) {
    return clothes;
  }

  // clothes.length / numberOfClothesReturnedByRequest is current page. + 1 for next page.
  const nextPage =
    Math.trunc(clothes.length / numberOfClothesReturnedByRequest) + 1;

  const nextPageData = await requestData(key, {
    ...requestOptions,
    limit: numberOfClothesReturnedByRequest,
    page: nextPage,
  });

  if (nextPageData.length < numberOfClothesReturnedByRequest)
    return clothes.concat(nextPageData);

  return await recursiveGetClothes(
    clothes.concat(nextPageData),
    key,
    requestOptions,
    requestData,
    numberOfClothesReturnedByRequest,
    numberOfClothesNeeded
  );
};
