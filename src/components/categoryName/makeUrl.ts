import { QueryParams } from './categoryName';

export const makeUrl = (
  query: QueryParams,
  index = 0,
  limit: number | undefined,
  selectedWebsites: string
): string | null => {
  const { gender, categoryName } = query;

  if (!gender || !categoryName || !limit) return null;

  const url = `/api/clothes/${gender}/${categoryName}`;

  const searchParams = new URLSearchParams();
  searchParams.append('page', (index + 1).toString());
  searchParams.append('limit', limit.toString());
  searchParams.append('selectedWebsites', selectedWebsites);
  searchParams.append('sort', 'bald');
  return `${url}?${searchParams.toString()}`;
};
