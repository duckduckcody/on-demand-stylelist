import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../client/util/absoluteUrl';
import { ClotheInfo, ClotheInfoImages } from '../../types/ClotheInfo';
import { THUMBNAIL_WIDTH } from '../constants';
import { COOL_SHIRTZ_LOGO } from './constants';

export const getClotheInfoCoolShirtz = async (
  clotheUrl: URL
): Promise<ClotheInfo> => {
  return fetch(clotheUrl.href)
    .then((res) => res.text())
    .then((htmlString) => scrapeHtml(htmlString))
    .catch((e) => Promise.reject(e));
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
        thumbnail: imageUrl.replace('x1440', `x${THUMBNAIL_WIDTH}`),
      });
    }
  }
  const description = document
    .getElementById('product-description')
    ?.innerHTML.trim();

  if (!description || images.length === 0) {
    console.log(
      'getClotheInfoCoolShirtz.ts - scrapeHtml() - failed to get clothe info',
      `description: ${description}`,
      `images:${images}`
    );
    throw new Error();
  }

  return {
    websitesLogo: COOL_SHIRTZ_LOGO,
    images,
    description,
  };
};
