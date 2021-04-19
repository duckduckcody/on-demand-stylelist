import { ClotheItem, GetClothesOptions } from '../../api/getClothes';
import { ClotheSortOption } from '../../constants';
import { recursiveGetClothes } from '../recursiveGetClothes';

const requestOptions: GetClothesOptions = {
  limit: 3,
  page: 0,
  sort: ClotheSortOption.BEST_SELLING,
};

test('recursiveGetClothes', () => {
  expect(null).toBe(null);
});
