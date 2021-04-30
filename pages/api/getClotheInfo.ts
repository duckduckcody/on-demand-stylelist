import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { serverSideWebsites } from '../../src/api/serverSideWebsites';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const clotheLink = `${req.query.clotheLink}`;

  const response = z.string().url().safeParse(clotheLink);
  if (!response.success)
    return res.status(400).json({ message: response.error });

  const url = new URL(clotheLink);
  const scraperInfo = serverSideWebsites.find((s) => s.baseUrl === url.origin);

  if (!scraperInfo || !scraperInfo.getClotheInfoFunction)
    return res
      .status(400)
      .json({ message: `no scraper found for ${url.origin}` });

  const clotheInfo = await scraperInfo.getClotheInfoFunction(url);

  return res.status(200).json(clotheInfo);
}
