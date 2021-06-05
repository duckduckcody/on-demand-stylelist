import { ClotheItem } from '../types/ClotheItem';

export const pageClothes = (
  clothes: Partial<ClotheItem>[],
  requestOptions: { page: number; limit: number }
): Partial<ClotheItem>[] => {
  if (!clothes) return [];
  const bottom = (requestOptions.page - 1) * requestOptions.limit;
  const top = bottom + requestOptions.limit;
  return clothes!.slice(bottom, top);
};
