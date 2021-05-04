import { ClotheSortOption } from './ClotheSort';

export interface GetClothesOptions {
  limit: number;
  page: number;
  sort: ClotheSortOption;
}
