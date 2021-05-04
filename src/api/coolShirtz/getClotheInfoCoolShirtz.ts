import { JSDOM } from 'jsdom';
import { absoluteUrl } from '../../client/util/absoluteUrl';
import {
  ClotheInfo,
  ClotheInfoImages,
  RelatedProducts,
} from '../../types/ClotheInfo';
import { THUMBNAIL_WIDTH } from '../constants';
import { COOL_SHIRTZ_BASE_URL, COOL_SHIRTZ_LOGO } from './constants';

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

  const description = document
    .getElementById('product-description')
    ?.innerHTML.trim();

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

  const relatedProducts: RelatedProducts[] = [];
  const relatedProductsContainer = document.getElementById('related');
  const relatedProductElements =
    relatedProductsContainer?.getElementsByClassName('related-product') || [];
  for (const relatedProductElement of relatedProductElements) {
    const aElement = relatedProductElement.getElementsByTagName('a')[0];
    const link = `${COOL_SHIRTZ_BASE_URL}${aElement.getAttribute('href')}`;
    const name = aElement.getAttribute('title');
    const image = relatedProductElement
      .getElementsByTagName('img')[0]
      .getAttribute('data-src');

    if (link && name && image) {
      relatedProducts.push({
        link,
        name,
        image,
      });
    }
  }

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
    relatedProducts,
  };
};
