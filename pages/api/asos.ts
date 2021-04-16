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
    makeAsosApiUrl('/men/cat/?cid=5668', {
      limit: 1,
      page: 1,
      sort: ClotheSortOption.NEWEST,
    }),
    {
      headers: HEADERS,
    }
  );

  console.log('response', response);

  return response.text().then((text) => {
    return res.status(200).json({ res: text, status: res.statusCode });
  });
}
