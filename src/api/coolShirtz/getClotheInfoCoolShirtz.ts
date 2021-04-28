import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../util/absoluteUrl';
import { ClotheInfo, ClotheInfoImages } from '../getClothes';
import { COOL_SHIRTZ_LOGO } from './constants';

export const getClotheInfoCoolShirtz = async (
  clotheLink: string
): Promise<ClotheInfo> => {
  const res = await fetch(clotheLink);
  const htmlString = await res.text();
  return scrapeHtml(htmlString);
};

export const scrapeHtml = (htmlString: string): ClotheInfo => {
  const { document } = new JSDOM(htmlString).window;
  const images: ClotheInfoImages[] = [];
  const imageElements = document.getElementsByClassName('thumb clicker-thumb');
  for (const imageElement of imageElements) {
    const imageUrl =
      absoluteUrl(imageElement.getAttribute('href')) || undefined;

    if (imageUrl) {
      images.push({
        image: imageUrl,
        thumbnail: imageUrl.replace('x1440', 'x150'),
      });
    }
  }
  const description = document
    .getElementById('product-description')
    ?.innerHTML.trim();

  return {
    websitesLogo: COOL_SHIRTZ_LOGO,
    images,
    description,
  };
};
