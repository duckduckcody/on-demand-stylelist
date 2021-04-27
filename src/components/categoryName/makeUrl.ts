import { ClotheSortOption } from '../../constants';
import { QueryParams } from './categoryName';

export const makeUrl = (
  query: QueryParams,
  index: number,
  limit: number | undefined,
  selectedWebsites: string,
  clotheSortOption: ClotheSortOption | undefined
): string | null => {
  const { gender, categoryName } = query;

  if (!gender || !categoryName || !limit) return null;

  const url = `/api/${gender}/${categoryName}`;

  const searchParams = new URLSearchParams();
  searchParams.append('page', `${index + 1}`);
  searchParams.append('selectedWebsites', selectedWebsites);
  limit && searchParams.append('limit', `${limit}`);
  clotheSortOption && searchParams.append('sort', clotheSortOption);
  return `${url}?${searchParams}`;
};
