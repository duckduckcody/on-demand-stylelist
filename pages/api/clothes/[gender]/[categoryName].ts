import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import {
  DEFAULT_CLOTHE_SORT,
  DEFAULT_RESPONSE_LIMIT,
} from '../../../../src/api/config';
import { getClothes, GetClothesOptions } from '../../../../src/api/getClothes';
import {
  categories,
  NO_WEBSITES_FOUND_API_ERROR_RESPONSE_MESSAGE,
  parseClotheSortOption,
} from '../../../../src/constants';
import { safeParseStringToInt } from '../../../../src/util/safeParseStringToInt';

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
    return res
      .status(400)
      .json({ message: NO_WEBSITES_FOUND_API_ERROR_RESPONSE_MESSAGE });

  const clotheOptions: GetClothesOptions = {
    limit: safeParseStringToInt(limit) ?? DEFAULT_RESPONSE_LIMIT,
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
