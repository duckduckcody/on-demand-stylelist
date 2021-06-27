import { Promise } from 'bluebird';
import { flatten } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { apiWebsites } from '../../src/api/apiWebsites';
import { DEFAULT_CLOTHE_LIMIT } from '../../src/api/constants';
import { safeParseStringToInt } from '../../src/client/util/safeParseStringToInt';
import { ClotheItem } from '../../src/types/ClotheItem';
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

  return await mapGetClothes(
    `${searchQuery}`,
    parsedSelectedWebsites,
    searchOptions
  )
    .then((clothes) => res.status(200).json(clothes))
    .catch((error: unknown) =>
      res.status(500).json({
        message:
          error instanceof Error
            ? error.message
            : 'A server error has occurred when fetching styles',
      })
    );
}

const mapGetClothes = async (
  searchQuery: string,
  selectedWebsites: string[],
  searchOptions: GetClothesOptions
): Promise<Partial<ClotheItem>[]> =>
  await Promise.map(selectedWebsites, async (selectedWebsiteId) => {
    const website = apiWebsites.find(
      (website) => website.id === +selectedWebsiteId
    );
    if (!website || !website.searchFunction) return [];
    return website.searchFunction(searchQuery, searchOptions);
  })
    .then((res) => flatten(res))
    .catch((error: unknown) => Promise.reject(error));
