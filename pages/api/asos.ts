import { NextApiRequest, NextApiResponse } from 'next';
import { makeAsosApiUrl } from '../../src/api/asos/constants';
import { getClothesAsos } from '../../src/api/asos/getClothesAsos';
import { HEADERS } from '../../src/api/constants';
import { ClotheSortOption } from '../../src/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const response = await fetch(
    makeAsosApiUrl('3000', {
      limit: 1,
      page: 1,
      sort: ClotheSortOption.NEWEST,
    }),
    {
      headers: HEADERS,
    }
  );
  return res.status(200).send(response);
}
