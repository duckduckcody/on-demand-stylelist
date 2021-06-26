import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';

export const recursiveGetClothes = async (
  clothes: Partial<ClotheItem>[],
  key: string,
  requestOptions: GetClothesOptions,
  requestData: (
    key: string,
    requestOptions: GetClothesOptions
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
