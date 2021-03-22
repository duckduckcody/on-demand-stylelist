import { NextApiRequest, NextApiResponse } from 'next';
import { categories } from '../../../../src/api/constants';
import { getClothes } from '../../../../src/api/getClothes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { categoryName, gender, page, limit, selectedWebsites } = req.query;
  if (!categoryName)
    return res.status(404).json({ message: 'clothe category not provided' });

  const category = categories.find(
    (category) => category.name === categoryName && category.gender === gender
  );

  if (!category)
    return res.status(404).json({ message: 'clothe category not found' });

  const parsedSelectedWebsites = JSON.parse(`${selectedWebsites}` ?? '[]');
  if (!parsedSelectedWebsites.length)
    return res.status(400).json({ message: 'no websites selected' });

  const clothes = await getClothes(`${category.id}`, parsedSelectedWebsites, {
    page: +`${page}`,
    limit: +`${limit}`,
  });

  return res.status(200).json(clothes);
}
