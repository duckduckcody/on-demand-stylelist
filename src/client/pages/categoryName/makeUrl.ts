import { ClotheSortOption } from '../../../types/ClotheSort';
import { QueryParams } from './categoryName';

export const makeUrl = (
  query: QueryParams,
  index: number,
  limit: number | undefined,
  selectedWebsites: string[] | undefined,
  clotheSortOption: ClotheSortOption | undefined
): string[] | null => {
  const { gender, categoryName } = query;

  if (!gender || !categoryName || !limit || !selectedWebsites) return null;

  const url = `/api/${gender}/${categoryName}`;

  const searchParams = new URLSearchParams();
  searchParams.append('page', `${index + 1}`);
  limit && searchParams.append('limit', `${limit}`);
  clotheSortOption && searchParams.append('sort', clotheSortOption);
  return [`${url}?${searchParams}`, JSON.stringify(selectedWebsites)];
};
