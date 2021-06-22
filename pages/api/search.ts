import { Promise } from 'bluebird';
import { flatten } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { apiWebsites } from '../../src/api/apiWebsites';
import { DEFAULT_CLOTHE_LIMIT } from '../../src/api/constants';
import { safeParseStringToInt } from '../../src/client/util/safeParseStringToInt';
import { GetClothesOptions } from '../../src/types/GetClothesOptions';

const SearchApiQuerySchema = z.object({
  query: z.string(),
  selectedWebsites: z.string(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { query: searchQuery, selectedWebsites, page, limit } = req.query;

  const response = SearchApiQuerySchema.safeParse(req.query);
  if (!response.success)
    return res.status(400).json({ message: response.error });

  const parsedSelectedWebsites: string[] = JSON.parse(
    `${selectedWebsites}` ?? '[]'
  );
  if (!parsedSelectedWebsites.length)
    return res.status(400).json({ message: 'no websites selected' });

  const searchOptions: GetClothesOptions = {
    limit: safeParseStringToInt(limit) ?? DEFAULT_CLOTHE_LIMIT,
    page: safeParseStringToInt(page) ?? 1,
  };

  const clothes = await Promise.map(
    parsedSelectedWebsites,
    async (selectedWebsiteId: string) => {
      const website = apiWebsites.find(
        (website) => website.id === +selectedWebsiteId
      );
      if (!website || !website.searchFunction) return [];
      return website.searchFunction(`${searchQuery}`, searchOptions);
    }
  ).then((res) => flatten(res));

  return res.status(200).json(clothes);
}
