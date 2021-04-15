import { NextApiRequest, NextApiResponse } from 'next';
import { getClothesAsos } from '../../src/api/asos/getClothesAsos';
import { ClotheSortOption } from '../../src/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const clothes = await getClothesAsos('3000', {
    limit: 1,
    page: 1,
    sort: ClotheSortOption.NEWEST,
  });
  return res.status(200).json(clothes);
}
