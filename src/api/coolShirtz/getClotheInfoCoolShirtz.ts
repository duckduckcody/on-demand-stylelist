import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../util/absoluteUrl';
import { ClotheInfo } from '../getClothes';

export const getClotheInfoCoolShirtz = async (
  clotheLink: string
): Promise<ClotheInfo> => {
  const res = await fetch(clotheLink);
  const htmlString = await res.text();
  return scrapeHtml(htmlString);
};

export const scrapeHtml = (htmlString: string): ClotheInfo => {
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

  const websitesLogo =
    document.getElementById('cool-logo-nav')?.getAttribute('data-src') ||
    undefined;

  return {
    websitesLogo,
    images,
    description,
  };
};
