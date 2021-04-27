import { JSDOM } from 'jsdom';
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import * as z from 'zod';
import { COOL_SHIRTZ_BASE_URL } from '../../src/api/coolShirtz/constants';
import { absoluteUrl } from '../../src/util/absoluteUrl';

const CategoryNameApiQuerySchema = z.object({
  clotheLink: z.string().url(),
});

const testScraper = async (clotheLink: string) => {
  const res = await fetch(clotheLink);
  const htmlString = await res.text();
  return scrapeHtml(htmlString);
};

const scrapeHtml = (htmlString: string) => {
  const { document } = new JSDOM(htmlString).window;
  const images = [];
  const imageElements = document.getElementsByClassName('thumb clicker-thumb');
  for (const imageElement of imageElements) {
    images.push(
      absoluteUrl(imageElement.getAttribute('href'))?.replace('x800', 'x1440')
    );
  }
  const description = document
    .getElementById('product-description')
    ?.innerHTML.trim();

  const websitesLogo = document
    .getElementById('cool-logo-nav')
    ?.getAttribute('data-src');

  return {
    websitesLogo,
    images,
    description,
  };
};

const baseUrlToScraper = [
  {
    name: 'cool shirtz',
    baseUrl: COOL_SHIRTZ_BASE_URL,
    scraper: testScraper,
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const clotheLink = `${req.query.clotheLink}`;

  const response = CategoryNameApiQuerySchema.safeParse(req.query);
  if (!response.success)
    return res.status(400).json({ message: response.error });

  const url = new URL(clotheLink);
  const scraperInfo = baseUrlToScraper.find((s) => s.baseUrl === url.origin);

  if (!scraperInfo)
    return res
      .status(400)
      .json({ message: `no scraper found for ${url.origin}` });

  const clotheInfo = await scraperInfo.scraper(clotheLink);

  return res.status(200).json(clotheInfo);
}
