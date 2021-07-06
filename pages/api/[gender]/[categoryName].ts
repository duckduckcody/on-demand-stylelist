import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { getListClothes } from '../../../src/api/common/mapGetListClothes';
import {
  DEFAULT_CLOTHE_LIMIT,
  DEFAULT_CLOTHE_SORT,
} from '../../../src/api/constants';
import { categories } from '../../../src/categories';
import { safeParseStringToInt } from '../../../src/client/util/safeParseStringToInt';
import { parseClotheSortOption } from '../../../src/types/ClotheSort';
import { GetClothesOptions } from '../../../src/types/GetClothesOptions';

const CategoryNameApiQuerySchema = z.object({
  categoryName: z.string(),
  gender: z.string(),
  selectedWebsite: z.string(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { categoryName, gender, page, limit, selectedWebsite, sort } =
    req.query;

  const response = CategoryNameApiQuerySchema.safeParse(req.query);
  if (!response.success)
    return res.status(400).json({ message: response.error });

  const category = categories.find(
    (category) => category.name === categoryName && category.gender === gender
  );

  if (!category)
    return res.status(404).json({ message: 'clothe category not found' });

  if (!`${selectedWebsite}`)
    return res.status(400).json({ message: 'no website selected' });

  const clotheOptions: GetClothesOptions = {
    limit: safeParseStringToInt(limit) ?? DEFAULT_CLOTHE_LIMIT,
    page: safeParseStringToInt(page) ?? 1,
    sort: parseClotheSortOption(sort) ?? DEFAULT_CLOTHE_SORT,
  };

  return await getListClothes(
    `${category.id}`,
    `${selectedWebsite}`,
    clotheOptions
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
