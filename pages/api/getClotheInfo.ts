import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { websites } from '../../src/api/constants';

const CategoryNameApiQuerySchema = z.object({
  clotheLink: z.string().url(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const clotheLink = `${req.query.clotheLink}`;

  const response = CategoryNameApiQuerySchema.safeParse(req.query);
  if (!response.success)
    return res.status(400).json({ message: response.error });

  const url = new URL(clotheLink);
  const scraperInfo = websites.find((s) => s.baseUrl === url.origin);

  if (!scraperInfo || !scraperInfo.getClotheInfoFunction)
    return res
      .status(400)
      .json({ message: `no scraper found for ${url.origin}` });

  const clotheInfo = await scraperInfo.getClotheInfoFunction(clotheLink);

  return res.status(200).json(clotheInfo);
}
