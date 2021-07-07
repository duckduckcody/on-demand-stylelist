import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { searchClothesList } from '../../src/api/common/searchClothesList';
import { DEFAULT_CLOTHE_LIMIT } from '../../src/api/constants';
import { safeParseStringToInt } from '../../src/client/util/safeParseStringToInt';
import { GetClothesOptions } from '../../src/types/GetClothesOptions';

const SearchApiQuerySchema = z.object({
  query: z.string(),
  selectedWebsite: z.string(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { query: searchQuery, selectedWebsite, page, limit } = req.query;

  const response = SearchApiQuerySchema.safeParse(req.query);
  if (!response.success)
    return res.status(400).json({ message: response.error });

  if (!selectedWebsite)
    return res.status(400).json({ message: 'no websites selected' });

  const requestOptions: GetClothesOptions = {
    limit: safeParseStringToInt(limit) ?? DEFAULT_CLOTHE_LIMIT,
    page: safeParseStringToInt(page) ?? 1,
  };

  return await searchClothesList(
    `${searchQuery}`,
    `${selectedWebsite}`,
    requestOptions
  )
    .then((clothes) => res.status(200).json(clothes))
    .catch((error: unknown) =>
      res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : 'A server error has occurred when searching styles',
      })
    );
}
