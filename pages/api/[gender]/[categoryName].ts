import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import {
  DEFAULT_CLOTHE_LIMIT,
  DEFAULT_CLOTHE_SORT
} from '../../../src/api/constants';
import { getClothes } from '../../../src/api/getClothes';
import { categories } from '../../../src/categories';
import { safeParseStringToInt } from '../../../src/client/util/safeParseStringToInt';
import { parseClotheSortOption } from '../../../src/types/ClotheSort';
import { GetClothesOptions } from '../../../src/types/GetClothesOptions';

const CategoryNameApiQuerySchema = z.object({
  categoryName: z.string(),
  gender: z.string(),
  selectedWebsites: z.string(),
  page: z.string().optional(),
  limit: z.string().optional(),
  sort: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const {
    categoryName,
    gender,
    page,
    limit,
    selectedWebsites,
    sort,
  } = req.query;

  const response = CategoryNameApiQuerySchema.safeParse(req.query);
  if (!response.success)
    return res.status(400).json({ message: response.error });

  const category = categories.find(
    (category) => category.name === categoryName && category.gender === gender
  );

  if (!category)
    return res.status(404).json({ message: 'clothe category not found' });

  const parsedSelectedWebsites = JSON.parse(`${selectedWebsites}` ?? '[]');
  if (!parsedSelectedWebsites.length)
    return res.status(400).json({ message: 'no websites selected' });

  const clotheOptions: GetClothesOptions = {
    limit: safeParseStringToInt(limit) ?? DEFAULT_CLOTHE_LIMIT,
    page: safeParseStringToInt(page) ?? 1,
    sort: parseClotheSortOption(sort) ?? DEFAULT_CLOTHE_SORT,
  };

  const clothes = await getClothes(
    `${category.id}`,
    parsedSelectedWebsites,
    clotheOptions
  );

  return res.status(200).json(clothes);
}
