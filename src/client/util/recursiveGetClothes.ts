import { ClotheItem } from '../../types/ClotheItem';
import { GetClothesOptions } from '../../types/GetClothesOptions';

export const recursiveGetClothes = async <T extends { uri: string }>(
  requestOptions: GetClothesOptions,
  clothes: Partial<ClotheItem>[],
  category: T,
  requestData: (
    category: T,
    requestOptions: GetClothesOptions
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

  const nextPageData = await requestData(category, {
    sort: requestOptions.sort,
    limit: numberOfClothesReturnedByRequest,
    page: nextPage,
  });

  if (nextPageData.length < numberOfClothesReturnedByRequest)
    return clothes.concat(nextPageData);

  return await recursiveGetClothes(
    requestOptions,
    clothes.concat(nextPageData),
    category,
    requestData,
    numberOfClothesReturnedByRequest,
    numberOfClothesNeeded
  );
};
